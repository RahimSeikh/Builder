import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Act } from "@/data/types";

export function PlotAccordion({ plot }: { plot: Act[] }) {
  return (
    <Accordion type="multiple" defaultValue={[plot[0]?.title]} className="space-y-3">
      {plot.map((act, ai) => (
        <AccordionItem
          key={act.title}
          value={act.title}
          className="rounded-xl border border-[color:var(--color-gold)]/15 bg-[color:var(--color-card)]/60 px-5"
        >
          <AccordionTrigger className="py-4 text-left hover:no-underline">
            <span className="flex items-baseline gap-3 min-w-0">
              <span className="font-display text-[color:var(--color-gold)] text-xl">
                {String(ai + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-lg">{act.title}</span>
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-5">
            <div className="space-y-5 border-l border-[color:var(--color-gold)]/25 pl-5">
              {act.scenes.map((sc) => (
                <div key={sc.title}>
                  <h4 className="font-display text-base text-[color:var(--color-gold-soft)]">
                    {sc.title}
                  </h4>
                  <p className="mt-2 leading-[1.85] text-[color:var(--color-foreground)]/90">
                    {sc.body}
                  </p>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
