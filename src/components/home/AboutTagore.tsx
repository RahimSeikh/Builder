import { tagoreBio } from "@/data/tagore";

export function AboutTagore() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
      <div className="mb-12 text-center">
        <div className="text-[11px] uppercase tracking-[0.3em] text-[color:var(--color-gold)] mb-3">
          Biography
        </div>
        <h2 className="font-display text-3xl sm:text-4xl">জীবন ও সাহিত্য</h2>
        <div className="gold-rule mx-auto mt-5 w-32" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {tagoreBio.sections.map((s, i) => (
          <article
            key={s.heading}
            className="rounded-2xl border border-[color:var(--color-gold)]/15 bg-[color:var(--color-card)]/70 p-7 backdrop-blur transition hover:border-[color:var(--color-gold)]/40"
          >
            <div className="flex items-baseline gap-3">
              <span className="font-display text-2xl text-[color:var(--color-gold)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-xl">{s.heading}</h3>
            </div>
            <p className="mt-4 leading-[1.85] text-[color:var(--color-foreground)]/90">
              {s.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
