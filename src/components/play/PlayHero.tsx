import type { Play } from "@/data/types";

export function PlayHero({ play }: { play: Play }) {
  return (
    <section className="relative overflow-hidden border-b border-[color:var(--color-gold)]/15 hero-gradient">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 sm:py-20 md:grid-cols-[1fr_auto]">
        <div className="animate-float-in">
          <div className="text-[11px] uppercase tracking-[0.3em] text-[color:var(--color-gold)] mb-3">
            {play.genre}
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl leading-tight text-gradient-gold">
            {play.title}
          </h1>
          <div className="mt-3 text-sm text-[color:var(--color-muted-foreground)]">
            রবীন্দ্রনাথ ঠাকুর · {play.year}
          </div>
          <div className="gold-rule my-6 w-32" />
          <p className="max-w-xl leading-relaxed text-[color:var(--color-foreground)]/90">
            {play.shortIntro}
          </p>
        </div>
        <div className="relative mx-auto md:mx-0 animate-float-in" style={{ animationDelay: "150ms" }}>
          <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-[color:var(--color-gold)]/40 to-transparent blur-xl" />
          <div className="relative aspect-[4/5] w-60 sm:w-72 overflow-hidden rounded-2xl border border-[color:var(--color-gold)]/40">
            <img
              src={play.cover}
              alt={`${play.title} cover`}
              width={1024}
              height={1280}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
