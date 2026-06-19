import type { ReactNode } from "react";

export function SectionHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-10">
      {eyebrow && (
        <p className="mb-3 text-[11px] uppercase tracking-[0.25em] text-gold/80">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
        {title}
      </h2>
      <div className="mt-4 h-px w-20 gold-divider" />
      {children && (
        <div className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground">
          {children}
        </div>
      )}
    </div>
  );
}
