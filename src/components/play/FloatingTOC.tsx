import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "summary", label: "সারসংক্ষেপ" },
  { id: "plot", label: "মূল কাহিনি" },
  { id: "characters", label: "চরিত্রসমূহ" },
  { id: "relationships", label: "চরিত্র সম্পর্ক" },
  { id: "timeline", label: "ঘটনাক্রম" },
  { id: "symbols", label: "প্রতীক ও রূপক" },
  { id: "significance", label: "সাহিত্যিক গুরুত্ব" },
  { id: "themes", label: "মূল ভাবনা ও থিম" },
];

export function FloatingTOC() {
  const [active, setActive] = useState<string>("summary");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* Desktop sticky TOC */}
      <aside className="hidden lg:block sticky top-24 self-start">
        <div className="rounded-2xl border border-[color:var(--color-gold)]/20 bg-[color:var(--color-card)]/70 p-5 backdrop-blur">
          <div className="text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-gold)] mb-4">
            Contents
          </div>
          <ul className="space-y-1.5 text-sm">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={`flex items-center gap-2 rounded-md px-2 py-1.5 transition ${
                    active === s.id
                      ? "bg-[color:var(--color-gold)]/15 text-[color:var(--color-gold)]"
                      : "text-[color:var(--color-foreground)]/80 hover:text-[color:var(--color-gold)]"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full transition ${
                      active === s.id ? "bg-[color:var(--color-gold)]" : "bg-[color:var(--color-foreground)]/30"
                    }`}
                  />
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Mobile floating button + sheet */}
      <div className="lg:hidden">
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 z-40 rounded-full bg-[color:var(--color-gold)] px-5 py-3 text-sm font-medium text-[color:var(--color-primary-foreground)] shadow-2xl"
        >
          সূচিপত্র
        </button>
        {open && (
          <div className="fixed inset-0 z-50">
            <div
              className="absolute inset-0 bg-black/60"
              onClick={() => setOpen(false)}
            />
            <div className="absolute inset-x-0 bottom-0 rounded-t-3xl border-t border-[color:var(--color-gold)]/30 bg-[color:var(--color-background)] p-6 pb-8">
              <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-[color:var(--color-gold)]/40" />
              <div className="text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-gold)] mb-3">
                Contents
              </div>
              <ul className="space-y-2 text-base">
                {SECTIONS.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      onClick={() => setOpen(false)}
                      className={`block rounded-lg px-3 py-2.5 ${
                        active === s.id
                          ? "bg-[color:var(--color-gold)]/15 text-[color:var(--color-gold)]"
                          : "text-[color:var(--color-foreground)]/90"
                      }`}
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
