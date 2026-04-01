export default function Footer() {
  const year = new Date().getFullYear();
  const utm = encodeURIComponent(window.location.hostname);

  return (
    <footer className="bg-foreground text-primary-foreground/80 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center space-y-2">
        <div className="font-display text-2xl font-bold text-primary-foreground">
          🍱 Tiffin Box
        </div>
        <p className="text-sm">
          Nutritious tiffin delivered to school, every day
        </p>
        <p className="text-xs opacity-60">
          © {year}. Built with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${utm}`}
            className="underline hover:text-primary-foreground transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </footer>
  );
}
