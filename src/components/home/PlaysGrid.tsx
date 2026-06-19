import { Link } from "@tanstack/react-router";
import { plays } from "@/data/plays";

export function PlaysGrid() {
  return (
    <section id="natok" className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
      <div className="mb-12 text-center">
        <div className="text-[11px] uppercase tracking-[0.3em] text-[color:var(--color-gold)] mb-3">
          The Play Collection
        </div>
        <h2 className="font-display text-3xl sm:text-4xl">নাট্য সংগ্রহ</h2>
        <div className="gold-rule mx-auto mt-5 w-32" />
        <p className="mx-auto mt-5 max-w-2xl text-[color:var(--color-muted-foreground)]">
          রবীন্দ্রনাথের তিনটি অমর প্রতীকধর্মী নাটক—সারসংক্ষেপ, চরিত্র, ঘটনাক্রম, প্রতীক ও থিম-বিশ্লেষণ সহ।
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {plays.map((p, i) => (
          <Link
            key={p.slug}
            to="/natok/$slug"
            params={{ slug: p.slug }}
            className="group relative overflow-hidden rounded-2xl border border-[color:var(--color-gold)]/15 bg-[color:var(--color-card)] transition hover:border-[color:var(--color-gold)]/50 hover:-translate-y-1"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={p.cover}
                alt={`${p.title} cover`}
                width={1024}
                height={1280}
                loading="lazy"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.12_0.04_265)] via-transparent to-transparent" />
            </div>
            <div className="p-6">
              <div className="text-[11px] uppercase tracking-[0.2em] text-[color:var(--color-gold)]/85">
                {p.genre}
              </div>
              <h3 className="mt-2 font-display text-2xl">{p.title}</h3>
              <div className="mt-1 text-xs text-[color:var(--color-muted-foreground)]">{p.year}</div>
              <p className="mt-4 text-sm leading-relaxed text-[color:var(--color-foreground)]/85">
                {p.shortIntro}
              </p>
              <div className="mt-6 inline-flex items-center gap-2 text-sm text-[color:var(--color-gold)]">
                বিস্তারিত পড়ুন
                <span aria-hidden className="transition group-hover:translate-x-1">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
