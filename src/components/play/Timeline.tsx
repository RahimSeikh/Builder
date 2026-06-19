import type { TimelineEvent } from "@/data/types";

export function Timeline({ events }: { events: TimelineEvent[] }) {
  return (
    <ol className="relative ml-3 space-y-8 border-l border-[color:var(--color-gold)]/30 pl-7">
      {events.map((e, i) => (
        <li key={i} className="relative">
          <span className="absolute -left-[34px] top-1 grid h-6 w-6 place-items-center rounded-full border border-[color:var(--color-gold)]/60 bg-[color:var(--color-background)] text-[10px] text-[color:var(--color-gold)]">
            {i + 1}
          </span>
          <div className="text-[11px] uppercase tracking-[0.2em] text-[color:var(--color-gold)]">
            {e.phase}
          </div>
          <h3 className="font-display text-lg mt-1">{e.title}</h3>
          <p className="mt-2 leading-relaxed text-[color:var(--color-foreground)]/90">{e.body}</p>
        </li>
      ))}
    </ol>
  );
}
