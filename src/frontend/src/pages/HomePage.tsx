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
import { Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useOrdersStore } from "../store/ordersStore";

const DAY_MENU: Record<
  string,
  { food: string; desc: string; emoji: string; color: string; badge: string }
> = {
  Monday: {
    food: "Dal Chawal",
    desc: "Comforting dal rice with tangy pickle",
    emoji: "🍚",
    color: "bg-amber-50",
    badge: "bg-amber-500",
  },
  Tuesday: {
    food: "Rajma Chawal",
    desc: "Kidney bean curry with steamed rice",
    emoji: "🫘",
    color: "bg-red-50",
    badge: "bg-red-500",
  },
  Wednesday: {
    food: "Chole Bhature",
    desc: "Spiced chickpea curry with fried bread",
    emoji: "🧆",
    color: "bg-yellow-50",
    badge: "bg-yellow-500",
  },
  Thursday: {
    food: "Paneer Sabzi + Roti",
    desc: "Cottage cheese curry with soft flatbread",
    emoji: "🥘",
    color: "bg-orange-50",
    badge: "bg-orange-500",
  },
  Friday: {
    food: "Veg Pulao",
    desc: "Fragrant rice with mixed vegetables",
    emoji: "🌾",
    color: "bg-green-50",
    badge: "bg-green-600",
  },
  Saturday: {
    food: "Veg Biryani",
    desc: "Aromatic rice cooked with spices",
    emoji: "🍛",
    color: "bg-purple-50",
    badge: "bg-purple-500",
  },
};

const DAYS = Object.keys(DAY_MENU);

const STEPS = [
  {
    icon: "📅",
    num: 1,
    title: "Choose a Day",
    desc: "Pick any day Mon–Sat from the weekly tiffin menu",
  },
  {
    icon: "📝",
    num: 2,
    title: "Fill Details",
    desc: "Enter parent and child information in the quick form",
  },
  {
    icon: "🏫",
    num: 3,
    title: "Get Tiffin",
    desc: "Fresh meal delivered right to school gate on time",
  },
];

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

export default function HomePage() {
  const orderRef = useRef<HTMLElement>(null);
  const addOrder = useOrdersStore((s) => s.addOrder);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [lastOrder, setLastOrder] = useState<{
    childName: string;
    food: string;
    day: string;
  } | null>(null);

  const foodItem = form.day ? DAY_MENU[form.day]?.food : "";

  function scrollToOrder() {
    orderRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleChange(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.day) {
      toast.error("Please select a day.");
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 500));
    const order = addOrder({
      parentName: form.parentName,
      phone: form.phone,
      childName: form.childName,
      schoolName: form.schoolName,
      classVal: form.classVal,
      rollNumber: form.rollNumber,
      day: form.day,
      foodItem: foodItem ?? "",
      address: form.address,
    });
    setLastOrder({
      childName: order.childName,
      food: order.foodItem,
      day: order.day,
    });
    setSuccess(true);
    setForm(INITIAL_FORM);
    setSubmitting(false);
  }

  return (
    <div className="min-h-screen bg-background doodle-bg">
      <Navbar onOrderClick={scrollToOrder} />

      {/* Hero */}
      <section className="pt-20 bg-secondary">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20 grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 bg-primary/15 text-primary px-4 py-1.5 rounded-full text-sm font-semibold">
              🌟 Trusted by 500+ Parents
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Fresh &amp; Healthy Tiffin for Your{" "}
              <span className="text-primary">Little Stars</span> ⭐
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Nutritious home-style meals packed with love — delivered fresh to
              your child’s school every weekday.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={scrollToOrder}
                data-ocid="hero.primary_button"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold text-base px-8 py-3.5 rounded-full shadow-green hover:opacity-90 hover:scale-105 transition-all duration-200"
              >
                Start Ordering 🛒
              </button>
              <a
                href="#menu"
                className="inline-flex items-center gap-2 bg-card text-foreground font-semibold text-base px-7 py-3.5 rounded-full border border-border hover:bg-muted transition-colors duration-200"
              >
                View Menu 📋
              </a>
            </div>
            <div className="flex gap-6 pt-2">
              <div className="text-center">
                <div className="font-bold text-2xl text-foreground">500+</div>
                <div className="text-xs text-muted-foreground">
                  Happy Parents
                </div>
              </div>
              <div className="text-center">
                <div className="font-bold text-2xl text-foreground">6 Days</div>
                <div className="text-xs text-muted-foreground">Mon–Sat</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-2xl text-foreground">100%</div>
                <div className="text-xs text-muted-foreground">Fresh Daily</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex justify-center relative"
          >
            <img
              src="/assets/generated/tiffin-hero.dim_600x500.png"
              alt="Happy school children enjoying tiffin"
              className="w-full max-w-[480px] drop-shadow-xl"
            />
            <div className="absolute bottom-10 left-4 bg-card rounded-2xl px-4 py-2.5 shadow-card flex items-center gap-2 border border-border">
              <span className="text-xl">🍱</span>
              <div>
                <div className="text-xs font-bold text-foreground">
                  Today’s Menu
                </div>
                <div className="text-xs text-muted-foreground">
                  Dal Chawal + Pickle
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-4xl font-bold text-foreground mb-3">
              This Week’s Tiffin Menu 🍽️
            </h2>
            <p className="text-muted-foreground text-lg">
              A wholesome treat every school day, packed with love
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {DAYS.map((day, i) => {
              const item = DAY_MENU[day];
              return (
                <motion.button
                  key={day}
                  type="button"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  onClick={() => {
                    handleChange("day", day);
                    scrollToOrder();
                  }}
                  className={`${item.color} rounded-3xl p-5 flex flex-col items-center text-center shadow-card hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-200 cursor-pointer border-2 border-transparent hover:border-primary/30`}
                  data-ocid={`menu.item.${i + 1}`}
                >
                  <span className="text-4xl mb-3">{item.emoji}</span>
                  <span
                    className={`text-xs font-bold uppercase tracking-wide text-white ${item.badge} px-3 py-1 rounded-full mb-2`}
                  >
                    {day.slice(0, 3)}
                  </span>
                  <h3 className="font-display text-sm font-bold text-foreground mb-1 leading-tight">
                    {item.food}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-snug">
                    {item.desc}
                  </p>
                </motion.button>
              );
            })}
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {DAYS.map((d) => (
              <div
                key={d}
                className={`h-2 rounded-full transition-all ${
                  form.day === d ? "bg-primary w-6" : "bg-border w-2"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-muted/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-4xl font-bold text-foreground mb-3">
              How It Works ✨
            </h2>
            <p className="text-muted-foreground text-lg">
              3 simple steps to get tiffin at school
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-card rounded-3xl p-8 text-center shadow-card relative"
              >
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg shadow-green">
                  {step.num}
                </div>
                <div className="text-5xl mb-4">{step.icon}</div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Order Form */}
      <section id="order" ref={orderRef} className="py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-display text-4xl font-bold text-foreground mb-3">
              Order Your Child’s Tiffin 🍱
            </h2>
            <p className="text-muted-foreground">
              Fill in the details below to place your order
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                data-ocid="order.success_state"
                className="bg-card border border-primary/20 rounded-3xl p-12 text-center shadow-card"
              >
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="font-display text-2xl font-bold text-primary mb-2">
                  Order Placed Successfully!
                </h3>
                {lastOrder && (
                  <div className="bg-primary/10 rounded-2xl p-4 mb-6 text-sm space-y-1 text-left max-w-xs mx-auto">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Child:</span>
                      <strong>{lastOrder.childName}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Day:</span>
                      <strong>{lastOrder.day}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Meal:</span>
                      <strong>{lastOrder.food}</strong>
                    </div>
                  </div>
                )}
                <p className="text-muted-foreground mb-6">
                  Your child’s tiffin will be delivered to school on time. 🏫
                </p>
                <Button
                  onClick={() => setSuccess(false)}
                  className="bg-primary text-primary-foreground rounded-full px-8 font-bold shadow-green"
                  data-ocid="order.primary_button"
                >
                  Place Another Order
                </Button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="bg-card rounded-3xl p-8 shadow-card space-y-5"
                data-ocid="order.modal"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <Label htmlFor="parentName" className="font-semibold">
                      Parent Name *
                    </Label>
                    <Input
                      id="parentName"
                      placeholder="e.g. Ramesh Sharma"
                      value={form.parentName}
                      onChange={(e) =>
                        handleChange("parentName", e.target.value)
                      }
                      required
                      className="rounded-xl"
                      data-ocid="order.input"
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
                      onValueChange={(v) => handleChange("day", v)}
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
                      className="rounded-xl bg-muted cursor-not-allowed font-semibold text-primary"
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
                  className="w-full text-white font-bold text-lg py-6 rounded-full transition-all duration-200 hover:scale-[1.02]"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.69 0.185 55), oklch(0.62 0.19 40))",
                  }}
                >
                  {submitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Placing Order...
                    </span>
                  ) : (
                    "🍱 CONFIRM ORDER"
                  )}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </div>
  );
}
