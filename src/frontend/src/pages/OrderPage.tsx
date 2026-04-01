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
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useActor } from "../hooks/useActor";

const DAY_MENU: Record<string, string> = {
  Monday: "Sandwich",
  Tuesday: "Chicken Roll",
  Wednesday: "Dumpling",
  Thursday: "Burger",
  Friday: "Chowmein",
  Saturday: "Fried Rice",
};

const DAYS = Object.keys(DAY_MENU);

interface FormState {
  parentName: string;
  phone: string;
  childName: string;
  schoolName: string;
  classVal: string;
  rollNumber: string;
  day: string;
  address: string;
}

const INITIAL_FORM: FormState = {
  parentName: "",
  phone: "",
  childName: "",
  schoolName: "",
  classVal: "",
  rollNumber: "",
  day: "",
  address: "",
};

export default function OrderPage() {
  const { actor } = useActor();
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const foodItem = form.day ? DAY_MENU[form.day] : "";

  function handleChange(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.day) {
      toast.error("Please select a day.");
      return;
    }
    if (!actor) {
      toast.error("Connecting to backend, please try again.");
      return;
    }
    setSubmitting(true);
    try {
      await actor.placeOrder({
        id: 0n,
        timestamp: 0n,
        status: "pending",
        parentName: form.parentName,
        phone: form.phone,
        childName: form.childName,
        schoolName: form.schoolName,
        class: form.classVal,
        rollNumber: form.rollNumber,
        day: form.day,
        foodItem: foodItem ?? "",
        address: form.address,
      });
      setSuccess(true);
      setForm(INITIAL_FORM);
    } catch (_err) {
      toast.error("Failed to place order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 pt-28 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <h1 className="font-display text-4xl font-bold text-foreground mb-2">
              Order Tiffin 🍱
            </h1>
            <p className="text-muted-foreground">
              Fill in the details below to place your order
            </p>
          </div>

          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                data-ocid="order.success_state"
                className="bg-green-50 border border-green-200 rounded-3xl p-12 text-center shadow-card"
              >
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="font-display text-3xl font-bold text-green-700 mb-3">
                  Tiffin order placed successfully!
                </h2>
                <p className="text-green-600 mb-6">
                  Your child's meal will be delivered to school on time.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    onClick={() => setSuccess(false)}
                    className="bg-primary text-primary-foreground rounded-full px-8 font-bold"
                    data-ocid="order.primary_button"
                  >
                    Place Another Order
                  </Button>
                  <Link to="/">
                    <Button
                      variant="outline"
                      className="rounded-full px-8 font-semibold w-full"
                    >
                      Back to Home
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="bg-card rounded-3xl p-8 shadow-card space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <Label htmlFor="parentName" className="font-semibold">
                      Parent Name *
                    </Label>
                    <Input
                      id="parentName"
                      data-ocid="order.input"
                      placeholder="e.g. Ramesh Sharma"
                      value={form.parentName}
                      onChange={(e) =>
                        handleChange("parentName", e.target.value)
                      }
                      required
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="phone" className="font-semibold">
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="e.g. 9876543210"
                      value={form.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      required
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="childName" className="font-semibold">
                      Child Name *
                    </Label>
                    <Input
                      id="childName"
                      placeholder="e.g. Priya Sharma"
                      value={form.childName}
                      onChange={(e) =>
                        handleChange("childName", e.target.value)
                      }
                      required
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="schoolName" className="font-semibold">
                      School Name *
                    </Label>
                    <Input
                      id="schoolName"
                      placeholder="e.g. Delhi Public School"
                      value={form.schoolName}
                      onChange={(e) =>
                        handleChange("schoolName", e.target.value)
                      }
                      required
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="classVal" className="font-semibold">
                      Class *
                    </Label>
                    <Input
                      id="classVal"
                      placeholder="e.g. 5A"
                      value={form.classVal}
                      onChange={(e) => handleChange("classVal", e.target.value)}
                      required
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="rollNumber" className="font-semibold">
                      Roll Number *
                    </Label>
                    <Input
                      id="rollNumber"
                      placeholder="e.g. 24"
                      value={form.rollNumber}
                      onChange={(e) =>
                        handleChange("rollNumber", e.target.value)
                      }
                      required
                      className="rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <Label className="font-semibold">Select Day *</Label>
                    <Select
                      value={form.day}
                      onValueChange={(val) => handleChange("day", val)}
                    >
                      <SelectTrigger
                        className="rounded-xl"
                        data-ocid="order.select"
                      >
                        <SelectValue placeholder="Choose a day" />
                      </SelectTrigger>
                      <SelectContent>
                        {DAYS.map((d) => (
                          <SelectItem key={d} value={d}>
                            {d}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="font-semibold">
                      Food Item (auto-filled)
                    </Label>
                    <Input
                      value={foodItem ?? ""}
                      readOnly
                      placeholder="Auto-filled on day selection"
                      className="rounded-xl bg-muted cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="address" className="font-semibold">
                    Delivery Address (optional)
                  </Label>
                  <Textarea
                    id="address"
                    placeholder="Enter home address if needed"
                    value={form.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    className="rounded-xl resize-none"
                    rows={3}
                    data-ocid="order.textarea"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  data-ocid="order.submit_button"
                  className="w-full bg-primary text-primary-foreground font-bold text-lg py-6 rounded-full shadow-card hover:shadow-card-hover transition-all duration-200 hover:scale-[1.02]"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Placing
                      Order...
                    </>
                  ) : (
                    "🍱 Place Tiffin Order"
                  )}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
