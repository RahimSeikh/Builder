import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  return (
    <header className="relative z-20 border-b border-border/40 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link to="/" className="group flex items-baseline gap-2">
          <span className="font-display text-lg font-semibold tracking-tight text-foreground sm:text-xl">
            শওকত নাট্যজগৎ
          </span>
          <span className="hidden text-[11px] uppercase tracking-[0.2em] text-gold/70 sm:inline">
            Archive
          </span>
        </Link>
        <nav className="flex items-center gap-5 text-sm text-muted-foreground">
          <Link
            to="/"
            activeOptions={{ exact: true }}
            activeProps={{ className: "text-gold" }}
            className="transition-colors hover:text-foreground"
          >
            লেখক
          </Link>
          <a href="/#plays" className="transition-colors hover:text-foreground">
            নাটক
          </a>
          <a href="/#about" className="transition-colors hover:text-foreground">
            পরিচিতি
          </a>
        </nav>
      </div>
    </header>
  );
}
