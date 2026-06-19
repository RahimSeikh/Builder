import { Link } from "@tanstack/react-router";

export function Nav() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[oklch(0.15_0.05_265/0.78)] border-b border-[color:var(--color-gold)]/15">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link to="/" className="group flex items-center gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[color:var(--color-gold)]/40 text-[color:var(--color-gold)] font-display text-lg">
            র
          </span>
          <div className="min-w-0 leading-tight">
            <div className="font-display text-base sm:text-lg text-gradient-gold">
              রবীন্দ্র নাট্যভুবন
            </div>
            <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-muted-foreground)]">
              Rabindra Natyabhuvan
            </div>
          </div>
        </Link>
        <ul className="flex items-center gap-1 sm:gap-2 text-sm">
          <li>
            <Link
              to="/"
              activeOptions={{ exact: true }}
              activeProps={{ className: "text-[color:var(--color-gold)]" }}
              inactiveProps={{ className: "text-[color:var(--color-foreground)]/85" }}
              className="rounded-md px-3 py-2 transition hover:text-[color:var(--color-gold)]"
            >
              হোম
            </Link>
          </li>
          <li>
            <Link
              to="/natok"
              activeProps={{ className: "text-[color:var(--color-gold)]" }}
              inactiveProps={{ className: "text-[color:var(--color-foreground)]/85" }}
              className="rounded-md px-3 py-2 transition hover:text-[color:var(--color-gold)]"
            >
              নাটকসমূহ
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
