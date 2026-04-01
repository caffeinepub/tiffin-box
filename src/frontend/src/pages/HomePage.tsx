import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const MENU = [
  {
    day: "Monday",
    food: "Sandwich",
    emoji: "🥪",
    desc: "Classic club sandwich with veggies & cheese",
    bg: "bg-orange-100",
    badge: "bg-orange-400",
  },
  {
    day: "Tuesday",
    food: "Chicken Roll",
    emoji: "🌯",
    desc: "Soft roll filled with seasoned chicken & sauce",
    bg: "bg-amber-100",
    badge: "bg-amber-400",
  },
  {
    day: "Wednesday",
    food: "Dumpling",
    emoji: "🥟",
    desc: "Steamed & juicy dumplings with dipping sauce",
    bg: "bg-green-100",
    badge: "bg-green-500",
  },
  {
    day: "Thursday",
    food: "Burger",
    emoji: "🍔",
    desc: "Mini burger with fresh lettuce & tomato",
    bg: "bg-teal-100",
    badge: "bg-teal-500",
  },
  {
    day: "Friday",
    food: "Chowmein",
    emoji: "🍜",
    desc: "Stir-fried noodles with colorful vegetables",
    bg: "bg-purple-100",
    badge: "bg-purple-500",
  },
  {
    day: "Saturday",
    food: "Fried Rice",
    emoji: "🍚",
    desc: "Wok-tossed fried rice with egg & vegetables",
    bg: "bg-rose-100",
    badge: "bg-rose-400",
  },
];

const STEPS = [
  {
    icon: "📋",
    title: "Fill the Form",
    desc: "Enter your child's details and select the school",
  },
  {
    icon: "📅",
    title: "Choose a Day",
    desc: "Pick a day and we auto-assign the delicious menu item",
  },
  {
    icon: "🏫",
    title: "Delivered to School",
    desc: "Fresh tiffin delivered right to your child's school gate",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/40 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/40 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 bg-secondary/60 text-foreground px-4 py-1.5 rounded-full text-sm font-semibold">
              🍱 Daily Fresh Tiffin Service
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground leading-tight">
              Fresh Tiffin, Every School Day 🍱
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Nutritious, delicious home-style meals delivered directly to your
              child's school — Monday through Saturday.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/order"
                data-ocid="hero.primary_button"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold text-lg px-8 py-4 rounded-full shadow-card hover:shadow-card-hover hover:scale-105 transition-all duration-200"
              >
                Order Now 🛒
              </Link>
              <a
                href="#menu"
                className="inline-flex items-center justify-center gap-2 bg-card text-foreground font-semibold text-lg px-8 py-4 rounded-full border border-border hover:bg-muted transition-colors duration-200"
              >
                View Menu 📋
              </a>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex justify-center"
          >
            <img
              src="/assets/generated/tiffin-hero.dim_600x500.png"
              alt="Happy school children with tiffin boxes"
              className="w-full max-w-md drop-shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Weekly Menu */}
      <section id="menu" className="py-20 bg-muted/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-4xl font-bold text-foreground mb-3">
              This Week's Menu 🍽️
            </h2>
            <p className="text-muted-foreground text-lg">
              A different treat every school day, made with love
            </p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {MENU.map((item, i) => (
              <motion.div
                key={item.day}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className={`${item.bg} rounded-3xl p-5 flex flex-col items-center text-center shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200`}
              >
                <span className="text-4xl mb-3">{item.emoji}</span>
                <span
                  className={`text-xs font-bold uppercase tracking-wide text-white ${item.badge} px-3 py-1 rounded-full mb-2`}
                >
                  {item.day}
                </span>
                <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                  {item.food}
                </h3>
                <p className="text-xs text-muted-foreground leading-snug">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-4xl font-bold text-foreground mb-3">
              How It Works ✨
            </h2>
            <p className="text-muted-foreground text-lg">
              Just 3 simple steps to get tiffin delivered
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-card rounded-3xl p-8 text-center shadow-card relative"
              >
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-display font-bold text-lg shadow-md">
                  {i + 1}
                </div>
                <div className="text-5xl mb-4">{step.icon}</div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Link
              to="/order"
              data-ocid="cta.primary_button"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold text-lg px-10 py-4 rounded-full shadow-card hover:shadow-card-hover hover:scale-105 transition-all duration-200"
            >
              Place Your Order Now 🚀
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
