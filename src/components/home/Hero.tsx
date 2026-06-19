import tagorePortrait from "@/assets/tagore.jpg";
import { tagoreBio } from "@/data/tagore";

export function Hero() {
  return (
    <section className="relative overflow-hidden hero-gradient">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-[color:var(--color-gold)]/10 blur-3xl animate-shimmer" />
        <div className="absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-[color:var(--indigo-deep)]/40 blur-3xl animate-shimmer" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 sm:py-24 md:grid-cols-[1fr_auto] md:py-32">
        <div className="animate-float-in">
          <div className="text-[11px] uppercase tracking-[0.3em] text-[color:var(--color-gold)] mb-4">
            Rabindra Natyabhuvan · A Digital Theatre Archive
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.1]">
            <span className="text-gradient-gold">রবীন্দ্রনাথ ঠাকুর</span>
          </h1>
          <div className="mt-3 text-base text-[color:var(--color-muted-foreground)] tracking-wide">
            {tagoreBio.years} · কবি · নাট্যকার · দার্শনিক
          </div>
          <div className="gold-rule my-6 w-40" />
          <p className="max-w-xl text-[15px] sm:text-base leading-relaxed text-[color:var(--color-foreground)]/90">
            {tagoreBio.shortIntro}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#natok"
              className="inline-flex items-center gap-2 rounded-full bg-[color:var(--color-gold)] px-6 py-3 text-sm font-medium text-[color:var(--color-primary-foreground)] transition hover:bg-[color:var(--color-gold-soft)]"
            >
              নাটকসমূহ দেখুন <span aria-hidden>→</span>
            </a>
            <a
              href="#about"
              className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-gold)]/40 px-6 py-3 text-sm transition hover:bg-[color:var(--color-gold)]/10"
            >
              জীবনী পড়ুন
            </a>
          </div>
        </div>

        <div className="relative mx-auto md:mx-0 animate-float-in" style={{ animationDelay: "200ms" }}>
          <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-[color:var(--color-gold)]/40 via-[color:var(--color-gold)]/10 to-transparent blur-xl" />
          <div className="relative aspect-square w-64 sm:w-80 overflow-hidden rounded-[1.75rem] border border-[color:var(--color-gold)]/40 bg-[color:var(--color-card)] shadow-2xl">
            <img
              src={tagorePortrait}
              alt="রবীন্দ্রনাথ ঠাকুরের চিত্র"
              width={1024}
              height={1024}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
