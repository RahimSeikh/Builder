import { Link } from "@tanstack/react-router";
import type { Play } from "@/content/plays";

export function PlayCard({ play }: { play: Play }) {
  return (
    <Link
      to="/plays/$slug"
      params={{ slug: play.slug }}
      className="group relative block overflow-hidden rounded-lg border border-border/60 bg-card transition-all duration-500 hover:border-gold/60 hover:-translate-y-1"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={play.cover}
          alt={`${play.title} — প্রতীকী মঞ্চচিত্র`}
          loading="lazy"
          className="h-full w-full object-cover opacity-70 transition-all duration-700 group-hover:scale-105 group-hover:opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/70 to-transparent" />
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 spotlight" />
      </div>
      <div className="relative -mt-12 p-6 pt-0">
        <p className="mb-2 text-[11px] uppercase tracking-[0.22em] text-gold/80">
          {play.year}
        </p>
        <h3 className="font-display text-2xl font-semibold text-foreground transition-colors group-hover:text-gold sm:text-3xl">
          {play.title}
        </h3>
        <p className="mt-2 text-sm italic text-muted-foreground">{play.tagline}</p>
        <p className="mt-4 text-sm leading-relaxed text-foreground/80">
          {play.shortDescription}
        </p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-gold transition-all group-hover:gap-3">
          গভীর বিশ্লেষণ দেখুন
          <span aria-hidden>→</span>
        </span>
      </div>
    </Link>
  );
}
