import type { Theme } from "@/data/types";

export function Themes({ themes }: { themes: Theme[] }) {
  return (
    <>
      <div className="mb-6 flex flex-wrap gap-2">
        {themes.map((t) => (
          <a
            key={t.name}
            href={`#theme-${encodeURIComponent(t.name)}`}
            className="rounded-full border border-[color:var(--color-gold)]/40 px-4 py-1.5 text-xs text-[color:var(--color-gold-soft)] transition hover:bg-[color:var(--color-gold)]/10"
          >
            {t.name}
          </a>
        ))}
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {themes.map((t) => (
          <div
            key={t.name}
            id={`theme-${encodeURIComponent(t.name)}`}
            className="rounded-xl border border-[color:var(--color-gold)]/15 bg-[color:var(--color-card)]/70 p-6"
          >
            <h3 className="font-display text-lg text-[color:var(--color-gold-soft)]">{t.name}</h3>
            <p className="mt-2 leading-relaxed text-[color:var(--color-foreground)]/90">{t.body}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export function LiteraryList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((s, i) => (
        <li
          key={i}
          className="flex gap-3 rounded-xl border border-[color:var(--color-gold)]/15 bg-[color:var(--color-card)]/60 p-4"
        >
          <span className="font-display text-[color:var(--color-gold)]">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="leading-relaxed text-[color:var(--color-foreground)]/90">{s}</span>
        </li>
      ))}
    </ul>
  );
}
