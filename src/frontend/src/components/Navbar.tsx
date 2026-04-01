import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-md border-b border-border shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-2 font-display font-bold text-xl text-foreground hover:text-primary transition-colors"
          data-ocid="nav.link"
        >
          <span className="text-2xl">🍱</span>
          <span>Tiffin Box</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 font-semibold text-muted-foreground">
          <Link
            to="/"
            className="hover:text-foreground transition-colors"
            data-ocid="nav.link"
          >
            Home
          </Link>
          <a href="/#menu" className="hover:text-foreground transition-colors">
            Menu
          </a>
          <Link
            to="/order"
            className="hover:text-foreground transition-colors"
            data-ocid="nav.link"
          >
            Order Now
          </Link>
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/order"
            data-ocid="nav.primary_button"
            className="bg-primary text-primary-foreground font-bold px-6 py-2.5 rounded-full shadow-card hover:shadow-card-hover hover:scale-105 transition-all duration-200 text-sm"
          >
            Order Now 🛒
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden p-2 rounded-xl text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-card border-b border-border px-4 pb-4 space-y-2 overflow-hidden"
          >
            <Link
              to="/"
              className="block py-2.5 font-semibold text-foreground hover:text-primary"
              onClick={() => setOpen(false)}
            >
              Home
            </Link>
            <a
              href="/#menu"
              className="block py-2.5 font-semibold text-foreground hover:text-primary"
            >
              Menu
            </a>
            <Link
              to="/order"
              className="block py-2.5 font-semibold text-foreground hover:text-primary"
              onClick={() => setOpen(false)}
            >
              Order Now
            </Link>
            <Link
              to="/order"
              className="block text-center bg-primary text-primary-foreground font-bold px-6 py-3 rounded-full mt-2"
              onClick={() => setOpen(false)}
            >
              Order Now 🛒
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
