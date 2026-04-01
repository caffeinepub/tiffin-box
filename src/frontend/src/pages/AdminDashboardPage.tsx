import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "@tanstack/react-router";
import {
  CheckCircle,
  Loader2,
  LogOut,
  RefreshCw,
  Search,
  Trash2,
} from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import type { OrderDTO } from "../backend.d";
import { useActor } from "../hooks/useActor";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const STATS_CONFIG = [
  {
    label: "Total Orders",
    color: "bg-blue-50 text-blue-700",
    emoji: "📦",
    key: "total" as const,
  },
  {
    label: "Pending",
    color: "bg-amber-50 text-amber-700",
    emoji: "⏳",
    key: "pending" as const,
  },
  {
    label: "Delivered",
    color: "bg-green-50 text-green-700",
    emoji: "✅",
    key: "delivered" as const,
  },
];

export default function AdminDashboardPage() {
  const router = useRouter();
  const { actor } = useActor();
  const [orders, setOrders] = useState<OrderDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterDay, setFilterDay] = useState("all");
  const [filterSchool, setFilterSchool] = useState("all");
  const [actionLoading, setActionLoading] = useState<Record<string, boolean>>(
    {},
  );

  useEffect(() => {
    if (localStorage.getItem("adminLoggedIn") !== "true") {
      router.navigate({ to: "/admin" });
    }
  }, [router]);

  const fetchOrders = useCallback(async () => {
    if (!actor) return;
    try {
      const data = await actor.getAllOrders();
      setOrders(data);
    } catch {
      toast.error("Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  }, [actor]);

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 10000);
    return () => clearInterval(interval);
  }, [fetchOrders]);

  function handleLogout() {
    localStorage.removeItem("adminLoggedIn");
    router.navigate({ to: "/admin" });
  }

  async function handleDeliver(id: bigint) {
    if (!actor) return;
    const key = id.toString();
    setActionLoading((prev) => ({ ...prev, [key]: true }));
    try {
      await actor.markOrderAsDelivered(id);
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status: "delivered" } : o)),
      );
      toast.success("Order marked as delivered!");
    } catch {
      toast.error("Failed to update order.");
    } finally {
      setActionLoading((prev) => ({ ...prev, [key]: false }));
    }
  }

  async function handleDelete(id: bigint) {
    if (!actor) return;
    const key = id.toString();
    setActionLoading((prev) => ({ ...prev, [`${key}_del`]: true }));
    try {
      await actor.deleteOrder(id);
      setOrders((prev) => prev.filter((o) => o.id !== id));
      toast.success("Order deleted.");
    } catch {
      toast.error("Failed to delete order.");
    } finally {
      setActionLoading((prev) => ({ ...prev, [`${key}_del`]: false }));
    }
  }

  const schools = Array.from(
    new Set(orders.map((o) => o.schoolName).filter(Boolean)),
  );

  const filtered = orders.filter((o) => {
    const matchSearch =
      search === "" ||
      o.childName.toLowerCase().includes(search.toLowerCase()) ||
      o.phone.includes(search);
    const matchDay = filterDay === "all" || o.day === filterDay;
    const matchSchool = filterSchool === "all" || o.schoolName === filterSchool;
    return matchSearch && matchDay && matchSchool;
  });

  const totalPending = orders.filter((o) => o.status === "pending").length;
  const totalDelivered = orders.filter((o) => o.status === "delivered").length;

  const statsValues: Record<string, number> = {
    total: orders.length,
    pending: totalPending,
    delivered: totalDelivered,
  };

  function formatDate(ts: bigint) {
    if (ts === 0n) return "—";
    return new Date(Number(ts) / 1_000_000).toLocaleDateString();
  }

  return (
    <div className="min-h-screen bg-sidebar">
      <header className="bg-card border-b border-border sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🍱</span>
            <h1 className="font-display text-xl font-bold text-foreground">
              Tiffin Box
            </h1>
            <Badge className="bg-primary/20 text-primary font-semibold border-0">
              Admin
            </Badge>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={fetchOrders}
              className="gap-2"
              data-ocid="dashboard.secondary_button"
            >
              <RefreshCw className="w-4 h-4" /> Refresh
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="gap-2 rounded-full"
              data-ocid="dashboard.primary_button"
            >
              <LogOut className="w-4 h-4" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-3 gap-4"
        >
          {STATS_CONFIG.map((stat) => (
            <div
              key={stat.key}
              className={`${stat.color} rounded-2xl p-5 shadow-card text-center`}
            >
              <div className="text-3xl mb-1">{stat.emoji}</div>
              <div className="font-display text-3xl font-bold">
                {statsValues[stat.key]}
              </div>
              <div className="text-sm font-semibold mt-0.5 opacity-80">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        <div className="bg-card rounded-2xl p-5 shadow-card flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by child name or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 rounded-xl"
              data-ocid="dashboard.search_input"
            />
          </div>
          <Select value={filterDay} onValueChange={setFilterDay}>
            <SelectTrigger
              className="w-full sm:w-40 rounded-xl"
              data-ocid="dashboard.select"
            >
              <SelectValue placeholder="Filter by day" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Days</SelectItem>
              {DAYS.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filterSchool} onValueChange={setFilterSchool}>
            <SelectTrigger className="w-full sm:w-48 rounded-xl">
              <SelectValue placeholder="Filter by school" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Schools</SelectItem>
              {schools.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-card rounded-2xl shadow-card overflow-hidden"
        >
          {loading ? (
            <div
              className="flex items-center justify-center py-20 gap-3"
              data-ocid="dashboard.loading_state"
            >
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
              <span className="text-muted-foreground">Loading orders...</span>
            </div>
          ) : filtered.length === 0 ? (
            <div
              className="text-center py-20"
              data-ocid="dashboard.empty_state"
            >
              <div className="text-5xl mb-4">📭</div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-1">
                No orders yet
              </h3>
              <p className="text-muted-foreground">
                {orders.length === 0
                  ? "Orders will appear here once parents start ordering."
                  : "No orders match the current filters."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table data-ocid="dashboard.table">
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-bold">Date</TableHead>
                    <TableHead className="font-bold">Parent</TableHead>
                    <TableHead className="font-bold">Phone</TableHead>
                    <TableHead className="font-bold">Child</TableHead>
                    <TableHead className="font-bold">School</TableHead>
                    <TableHead className="font-bold">Class</TableHead>
                    <TableHead className="font-bold">Roll No.</TableHead>
                    <TableHead className="font-bold">Day</TableHead>
                    <TableHead className="font-bold">Food</TableHead>
                    <TableHead className="font-bold">Status</TableHead>
                    <TableHead className="font-bold text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((order, idx) => {
                    const idKey = order.id.toString();
                    const isDelivering = actionLoading[idKey];
                    const isDeleting = actionLoading[`${idKey}_del`];
                    return (
                      <TableRow
                        key={idKey}
                        className="hover:bg-muted/30 transition-colors"
                        data-ocid={`dashboard.row.item.${idx + 1}`}
                      >
                        <TableCell className="text-sm whitespace-nowrap">
                          {formatDate(order.timestamp)}
                        </TableCell>
                        <TableCell className="font-medium whitespace-nowrap">
                          {order.parentName}
                        </TableCell>
                        <TableCell className="text-sm">{order.phone}</TableCell>
                        <TableCell className="font-medium whitespace-nowrap">
                          {order.childName}
                        </TableCell>
                        <TableCell className="text-sm whitespace-nowrap">
                          {order.schoolName}
                        </TableCell>
                        <TableCell className="text-sm">{order.class}</TableCell>
                        <TableCell className="text-sm">
                          {order.rollNumber}
                        </TableCell>
                        <TableCell className="text-sm whitespace-nowrap">
                          {order.day}
                        </TableCell>
                        <TableCell className="text-sm whitespace-nowrap">
                          {order.foodItem}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`rounded-full font-semibold text-xs ${
                              order.status === "delivered"
                                ? "bg-green-100 text-green-700 border-green-200"
                                : "bg-amber-100 text-amber-700 border-amber-200"
                            }`}
                            variant="outline"
                          >
                            {order.status === "delivered"
                              ? "✅ Delivered"
                              : "⏳ Pending"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              disabled={
                                order.status === "delivered" || isDelivering
                              }
                              onClick={() => handleDeliver(order.id)}
                              className="gap-1.5 rounded-full text-green-700 border-green-200 hover:bg-green-50 h-8 text-xs"
                              data-ocid={`dashboard.edit_button.${idx + 1}`}
                            >
                              {isDelivering ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                              ) : (
                                <CheckCircle className="w-3 h-3" />
                              )}
                              Deliver
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              disabled={isDeleting}
                              onClick={() => handleDelete(order.id)}
                              className="gap-1.5 rounded-full text-destructive border-destructive/30 hover:bg-destructive/10 h-8 text-xs"
                              data-ocid={`dashboard.delete_button.${idx + 1}`}
                            >
                              {isDeleting ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                              ) : (
                                <Trash2 className="w-3 h-3" />
                              )}
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
