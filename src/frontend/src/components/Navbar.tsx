import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Our Menu", href: "#menu" },
  { label: "How It Works", href: "#how-it-works" },
];

export default function Navbar({
  onOrderClick,
}: { onOrderClick?: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-xs">
      {/* Admin portal hint */}
      <div className="bg-primary/10 text-center py-0.5">
        <Link
          to="/admin"
          className="text-xs font-semibold text-primary hover:underline"
          data-ocid="nav.link"
        >
          Admin Portal →
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-2 font-display font-bold text-xl text-foreground hover:text-primary transition-colors"
          data-ocid="nav.link"
        >
          <span className="text-2xl">🍱</span>
          <span>TiffinJoy</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-7 text-sm font-semibold text-muted-foreground">
          {NAV_LINKS.map((link) =>
            link.href.startsWith("#") ? (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.href}
                className="hover:text-foreground transition-colors"
                data-ocid="nav.link"
              >
                {link.label}
              </Link>
            ),
          )}
          <Link
            to="/admin"
            className="hover:text-foreground transition-colors"
            data-ocid="nav.link"
          >
            Admin Portal
          </Link>
        </div>

        {/* CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/admin"
            className="text-sm font-semibold px-5 py-2 rounded-full border border-border text-foreground hover:bg-muted transition-colors"
            data-ocid="nav.link"
          >
            Sign In
          </Link>
          <button
            type="button"
            onClick={onOrderClick}
            className="text-sm font-bold px-6 py-2.5 rounded-full bg-primary text-primary-foreground shadow-green hover:opacity-90 hover:scale-105 transition-all duration-200"
            data-ocid="nav.primary_button"
          >
            ORDER NOW
          </button>
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

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-card border-b border-border px-4 pb-4 space-y-2 overflow-hidden"
          >
            {NAV_LINKS.map((link) =>
              link.href.startsWith("#") ? (
                <a
                  key={link.label}
                  href={link.href}
                  className="block py-2.5 font-semibold text-foreground hover:text-primary"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className="block py-2.5 font-semibold text-foreground hover:text-primary"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ),
            )}
            <Link
              to="/admin"
              className="block py-2.5 font-semibold text-foreground hover:text-primary"
              onClick={() => setOpen(false)}
            >
              Admin Portal
            </Link>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onOrderClick?.();
              }}
              className="w-full text-center bg-primary text-primary-foreground font-bold px-6 py-3 rounded-full mt-2"
            >
              ORDER NOW
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
