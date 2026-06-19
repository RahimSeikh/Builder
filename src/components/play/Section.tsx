import type { ReactNode } from "react";

export function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="py-14 sm:py-16">
      <div className="mb-8">
        {eyebrow && (
          <div className="text-[11px] uppercase tracking-[0.3em] text-[color:var(--color-gold)] mb-2">
            {eyebrow}
          </div>
        )}
        <h2 className="font-display text-2xl sm:text-3xl">{title}</h2>
        <div className="gold-rule mt-4 w-24" />
      </div>
      {children}
    </section>
  );
}
