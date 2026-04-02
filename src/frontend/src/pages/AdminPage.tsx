import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { CheckCircle, Lock, LogOut, Search, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useOrdersStore } from "../store/ordersStore";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    if (username === "admin" && password === "tiffin123") {
      onLogin();
    } else {
      setError("Invalid credentials. Please try again.");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-sidebar flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl shadow-green mb-4">
            <Lock className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Admin Login
          </h1>
          <p className="text-muted-foreground mt-1">TiffinJoy Dashboard</p>
        </div>

        <form
          onSubmit={handleLogin}
          className="bg-card rounded-3xl p-8 shadow-card space-y-5"
          data-ocid="admin.modal"
        >
          <div className="space-y-1.5">
            <Label htmlFor="username" className="font-semibold">
              Username
            </Label>
            <Input
              id="username"
              placeholder="admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="rounded-xl"
              data-ocid="admin.input"
              autoComplete="username"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password" className="font-semibold">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="rounded-xl"
              autoComplete="current-password"
            />
          </div>
          {error && (
            <p
              className="text-sm text-destructive font-medium"
              data-ocid="admin.error_state"
            >
              {error}
            </p>
          )}
          <Button
            type="submit"
            disabled={loading}
            data-ocid="admin.submit_button"
            className="w-full bg-primary text-primary-foreground font-bold text-base py-5 rounded-full shadow-green"
          >
            {loading ? "Logging in..." : "Login to Dashboard"}
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Demo: <strong>admin</strong> / <strong>tiffin123</strong>
          </p>
        </form>
      </motion.div>
    </div>
  );
}

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const { orders, markDelivered, deleteOrder } = useOrdersStore();
  const [search, setSearch] = useState("");
  const [filterDay, setFilterDay] = useState("all");
  const [filterSchool, setFilterSchool] = useState("all");

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

  const pending = orders.filter((o) => o.status === "pending").length;
  const delivered = orders.filter((o) => o.status === "delivered").length;

  function handleDeliver(id: string) {
    markDelivered(id);
    toast.success("Order marked as delivered!");
  }

  function handleDelete(id: string) {
    deleteOrder(id);
    toast.success("Order deleted.");
  }

  return (
    <div className="min-h-screen bg-sidebar">
      <header className="bg-card border-b border-border sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🍱</span>
            <h1 className="font-display text-xl font-bold text-foreground">
              TiffinJoy
            </h1>
            <Badge className="bg-primary/20 text-primary font-semibold border-0">
              Admin
            </Badge>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onLogout}
            className="gap-2 rounded-full"
            data-ocid="dashboard.primary_button"
          >
            <LogOut className="w-4 h-4" /> Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-3 gap-4"
        >
          <div className="bg-blue-50 text-blue-700 rounded-2xl p-5 text-center shadow-card">
            <div className="text-3xl mb-1">📦</div>
            <div className="font-display text-3xl font-bold">
              {orders.length}
            </div>
            <div className="text-sm font-semibold opacity-80">Total Orders</div>
          </div>
          <div className="bg-amber-50 text-amber-700 rounded-2xl p-5 text-center shadow-card">
            <div className="text-3xl mb-1">⏳</div>
            <div className="font-display text-3xl font-bold">{pending}</div>
            <div className="text-sm font-semibold opacity-80">Pending</div>
          </div>
          <div className="bg-green-50 text-green-700 rounded-2xl p-5 text-center shadow-card">
            <div className="text-3xl mb-1">✅</div>
            <div className="font-display text-3xl font-bold">{delivered}</div>
            <div className="text-sm font-semibold opacity-80">Delivered</div>
          </div>
        </motion.div>

        {/* Filters */}
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

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl shadow-card overflow-hidden"
        >
          {filtered.length === 0 ? (
            <div
              className="text-center py-20"
              data-ocid="dashboard.empty_state"
            >
              <div className="text-5xl mb-4">📭</div>
              <h3 className="font-display text-xl font-bold text-foreground mb-1">
                No orders yet
              </h3>
              <p className="text-muted-foreground">
                {orders.length === 0
                  ? "Orders placed by parents will appear here."
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
                    <TableHead className="font-bold">Food Item</TableHead>
                    <TableHead className="font-bold">Status</TableHead>
                    <TableHead className="font-bold text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((order, idx) => (
                    <TableRow
                      key={order.id}
                      className="hover:bg-muted/30 transition-colors"
                      data-ocid={`dashboard.row.item.${idx + 1}`}
                    >
                      <TableCell className="text-sm whitespace-nowrap">
                        {order.date}
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
                      <TableCell className="text-sm">
                        {order.classVal}
                      </TableCell>
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
                          variant="outline"
                          className={`rounded-full font-semibold text-xs ${
                            order.status === "delivered"
                              ? "bg-green-100 text-green-700 border-green-200"
                              : "bg-amber-100 text-amber-700 border-amber-200"
                          }`}
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
                            disabled={order.status === "delivered"}
                            onClick={() => handleDeliver(order.id)}
                            className="gap-1.5 rounded-full text-green-700 border-green-200 hover:bg-green-50 h-8 text-xs"
                            data-ocid={`dashboard.edit_button.${idx + 1}`}
                          >
                            <CheckCircle className="w-3 h-3" />
                            Deliver
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(order.id)}
                            className="gap-1.5 rounded-full text-destructive border-destructive/30 hover:bg-destructive/10 h-8 text-xs"
                            data-ocid={`dashboard.delete_button.${idx + 1}`}
                          >
                            <Trash2 className="w-3 h-3" />
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);

  if (!loggedIn) {
    return <AdminLogin onLogin={() => setLoggedIn(true)} />;
  }

  return <AdminDashboard onLogout={() => setLoggedIn(false)} />;
}
