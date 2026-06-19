import type { Character } from "@/data/types";

export function CharacterGrid({ characters }: { characters: Character[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {characters.map((c) => (
        <article
          key={c.name}
          className="rounded-xl border border-[color:var(--color-gold)]/15 bg-[color:var(--color-card)]/70 p-6 transition hover:border-[color:var(--color-gold)]/40"
        >
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="font-display text-xl">{c.name}</h3>
            <span className="shrink-0 rounded-full border border-[color:var(--color-gold)]/30 px-3 py-1 text-[11px] text-[color:var(--color-gold)]">
              {c.role}
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-foreground)]/90">
            {c.description}
          </p>
          <div className="mt-4 border-t border-[color:var(--color-gold)]/15 pt-3 text-xs leading-relaxed text-[color:var(--color-muted-foreground)]">
            <span className="text-[color:var(--color-gold)]">গুরুত্ব · </span>
            {c.importance}
          </div>
        </article>
      ))}
    </div>
  );
}
