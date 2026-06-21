import { writer, stories } from "@/data/hasan";
import { BookOpen, Quote } from "lucide-react";
import type { Selection } from "./AppShell";

export function WriterView({ onSelectStory }: { onSelectStory: (s: Selection) => void }) {
  return (
    <article className="mx-auto max-w-4xl px-5 md:px-10 py-10 md:py-16">
      <div className="grid md:grid-cols-[260px_1fr] gap-8 md:gap-12 items-start">
        <div className="relative">
          <div className="absolute -inset-2 rounded-md bg-gradient-to-br from-primary/25 to-accent/15 blur-xl" />
          <img
            src={writer.portrait}
            alt={`${writer.name} — চিত্রিত প্রতিকৃতি`}
            className="relative w-full rounded-md border border-border shadow-lg object-cover aspect-[4/5]"
            loading="eager"
          />
          <div className="relative mt-3 flex items-baseline justify-between px-1 text-xs text-muted-foreground">
            <span className="uppercase tracking-[0.2em]">Portrait</span>
            <span>চিত্রকল্প</span>
          </div>
        </div>

        <div>
          <div className="text-[11px] tracking-[0.32em] uppercase text-primary/90 mb-3">
            লেখক পরিচিতি
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-semibold leading-[1.15] text-foreground">
            {writer.name}
          </h1>
          <div className="mt-2 text-sm text-muted-foreground tracking-wider">
            {writer.lifespan}
          </div>

          <div className="mt-7 border-l-2 border-primary/60 pl-5">
            <Quote className="h-4 w-4 text-primary/70 mb-2" />
            <p className="prose-bn text-foreground/90">{writer.intro}</p>
          </div>

          <div className="mt-10">
            <div className="text-[11px] tracking-[0.28em] uppercase text-muted-foreground mb-4">
              নির্বাচিত তিনটি গল্প
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              {stories.map((s) => (
                <button
                  key={s.id}
                  onClick={() => onSelectStory({ kind: "story", id: s.id })}
                  className="text-left rounded-md border border-border bg-card/60 hover:bg-card hover:border-primary/40 transition-colors p-4 group"
                >
                  <BookOpen className="h-4 w-4 text-primary mb-3" />
                  <div className="font-display text-base font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
                    {s.title}
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed line-clamp-3">
                    {s.tagline}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
