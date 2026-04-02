import { Link } from "@tanstack/react-router";

export default function Footer() {
  const year = new Date().getFullYear();
  const utm = encodeURIComponent(window.location.hostname);

  return (
    <footer className="bg-secondary text-foreground">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-display font-bold text-xl">
              <span className="text-2xl">🍱</span>
              <span>TiffinJoy</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Nutritious, home-style tiffin meals delivered fresh to your
              child's school every day.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-base">For Schools &amp; Parents</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>✅ Hygienic kitchen-fresh meals</li>
              <li>✅ Monday to Saturday delivery</li>
              <li>✅ No subscription required</li>
              <li>✅ School-gate delivery</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-base">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#menu"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Weekly Menu
                </a>
              </li>
              <li>
                <a
                  href="#order"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Place Order
                </a>
              </li>
              <li>
                <Link
                  to="/admin"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/50 text-center text-xs text-muted-foreground">
          © {year}. Built with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${utm}`}
            className="underline hover:text-foreground transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
