import type { Relationship } from "@/data/types";

export function RelationshipMap({ relationships }: { relationships: Relationship[] }) {
  return (
    <div className="rounded-2xl border border-[color:var(--color-gold)]/15 bg-[color:var(--color-card)]/60 p-6">
      <ul className="grid gap-4 sm:grid-cols-2">
        {relationships.map((r, i) => (
          <li
            key={i}
            className="flex items-center gap-3 rounded-xl border border-[color:var(--color-gold)]/15 bg-[oklch(0.20_0.05_270)]/50 p-4"
          >
            <span className="rounded-lg bg-[color:var(--color-gold)]/15 px-3 py-1.5 font-display text-sm text-[color:var(--color-gold-soft)]">
              {r.from}
            </span>
            <span className="flex flex-1 items-center gap-2 text-xs text-[color:var(--color-muted-foreground)]">
              <span className="h-px flex-1 bg-[color:var(--color-gold)]/40" />
              <span>{r.label}</span>
              <span className="h-px flex-1 bg-[color:var(--color-gold)]/40" />
            </span>
            <span className="rounded-lg bg-[color:var(--color-gold)]/15 px-3 py-1.5 font-display text-sm text-[color:var(--color-gold-soft)]">
              {r.to}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
