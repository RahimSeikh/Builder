import type { SymbolItem } from "@/data/types";

export function Symbols({ symbols }: { symbols: SymbolItem[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {symbols.map((s) => (
        <div
          key={s.symbol}
          className="rounded-xl border border-[color:var(--color-gold)]/15 bg-[color:var(--color-card)]/70 p-6"
        >
          <div className="flex items-start gap-4">
            <span aria-hidden className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[color:var(--color-gold)]/15 font-display text-[color:var(--color-gold)]">
              ✦
            </span>
            <div className="min-w-0">
              <h3 className="font-display text-lg text-[color:var(--color-gold-soft)]">
                {s.symbol}
              </h3>
              <p className="mt-2 leading-relaxed text-[color:var(--color-foreground)]/90">
                {s.meaning}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
