import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Story } from "@/data/hasan";
import {
  BookOpen,
  Users,
  Layers3,
  Sparkles,
  Brain,
  PenLine,
  Landmark,
  Award,
  ScrollText,
} from "lucide-react";

const sections = [
  { id: "overview", label: "সারসংক্ষেপ", icon: ScrollText },
  { id: "narrative", label: "কাহিনি বিন্যাস", icon: BookOpen },
  { id: "characters", label: "চরিত্র", icon: Users },
  { id: "themes", label: "সমাজচিত্র ও থিম", icon: Layers3 },
  { id: "symbolism", label: "প্রতীক", icon: Sparkles },
  { id: "psychology", label: "মনস্তত্ত্ব", icon: Brain },
  { id: "literary", label: "সাহিত্যিক দৃষ্টি", icon: PenLine },
  { id: "history", label: "ঐতিহাসিক প্রেক্ষাপট", icon: Landmark },
  { id: "significance", label: "সাহিত্যিক গুরুত্ব", icon: Award },
] as const;

export function StoryView({ story }: { story: Story }) {
  const [active, setActive] = useState<string>("overview");

  useEffect(() => {
    setActive("overview");
  }, [story.id]);

  useEffect(() => {
    const opts = { root: null, rootMargin: "-30% 0px -55% 0px", threshold: 0 };
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setActive(e.target.id);
      });
    }, opts);
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [story.id]);

  return (
    <article className="mx-auto max-w-6xl px-5 md:px-10 py-8 md:py-12">
      <header className="mb-8 md:mb-12">
        <div className="text-[11px] tracking-[0.3em] uppercase text-primary/90 mb-3">
          গল্প-বিশ্লেষণ
        </div>
        <h2 className="font-display text-3xl md:text-5xl font-semibold leading-[1.15] text-foreground">
          {story.title}
        </h2>
        <p className="mt-3 text-muted-foreground text-base md:text-lg max-w-3xl">
          {story.tagline}
        </p>
      </header>

      <div className="grid lg:grid-cols-[200px_1fr] gap-10">
        <nav className="hidden lg:block sticky top-6 self-start">
          <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-3">
            অংশসমূহ
          </div>
          <ul className="space-y-1 text-sm">
            {sections.map((s) => {
              const Icon = s.icon;
              const isActive = active === s.id;
              return (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className={`flex items-center gap-2 rounded px-2 py-1.5 transition-colors ${
                      isActive
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{s.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="space-y-12 min-w-0">
          <Section id="overview" title="সারসংক্ষেপ">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="পটভূমি" value={story.overview.background} />
              <Field label="পরিবেশ" value={story.overview.setting} />
              <Field label="ভাবরস" value={story.overview.tone} />
              <Field label="সামাজিক প্রেক্ষাপট" value={story.overview.socialContext} />
            </div>
          </Section>

          <Section id="narrative" title="কাহিনি বিন্যাস">
            <Accordion type="multiple" defaultValue={["beginning"]} className="w-full">
              {(
                [
                  ["beginning", "সূচনা"],
                  ["conflict", "সংঘাতের উৎস"],
                  ["escalation", "ক্রমপ্রবৃদ্ধি"],
                  ["climax", "চূড়ান্ত মুহূর্ত"],
                  ["ending", "সমাপ্তি"],
                ] as const
              ).map(([k, label]) => (
                <AccordionItem key={k} value={k}>
                  <AccordionTrigger className="font-display text-base">
                    {label}
                  </AccordionTrigger>
                  <AccordionContent className="prose-bn text-foreground/90">
                    {story.narrative[k]}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Section>

          <Section id="characters" title="চরিত্র বিশ্লেষণ">
            <div className="grid md:grid-cols-2 gap-4">
              {story.characters.map((c) => (
                <Card key={c.name} className="bg-card/60 border-border">
                  <CardHeader className="pb-2">
                    <CardTitle className="font-display text-lg">{c.name}</CardTitle>
                    <div className="text-xs text-muted-foreground">{c.role}</div>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm leading-relaxed">
                    {c.psychology !== "—" && (
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.18em] text-primary/90 mb-1">
                          মনস্তত্ত্ব
                        </div>
                        <p className="text-foreground/90">{c.psychology}</p>
                      </div>
                    )}
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.18em] text-accent mb-1">
                        প্রতীকী অর্থ
                      </div>
                      <p className="text-foreground/90">{c.symbolism}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Section>

          <Section id="themes" title="সমাজচিত্র ও থিম">
            <div className="grid sm:grid-cols-2 gap-3">
              {story.themes.map((t) => (
                <div
                  key={t.name}
                  className="rounded-md border border-border bg-card/40 p-4"
                >
                  <Badge variant="secondary" className="font-display mb-2">
                    {t.name}
                  </Badge>
                  <p className="text-sm text-foreground/85 leading-relaxed">{t.note}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section id="symbolism" title="প্রতীক বিশ্লেষণ">
            <ul className="divide-y divide-border rounded-md border border-border bg-card/40">
              {story.symbolism.map((s) => (
                <li key={s.symbol} className="grid sm:grid-cols-[160px_1fr] gap-3 p-4">
                  <span className="font-display text-base text-accent">{s.symbol}</span>
                  <span className="text-sm text-foreground/90 leading-relaxed">
                    {s.meaning}
                  </span>
                </li>
              ))}
            </ul>
          </Section>

          <Section id="psychology" title="মনস্তাত্ত্বিক বিশ্লেষণ">
            <BulletList items={story.psychology} accent="primary" />
          </Section>

          <Section id="literary" title="সাহিত্যিক দৃষ্টিভঙ্গি">
            <BulletList items={story.literaryView} accent="accent" />
          </Section>

          <Section id="history" title="ঐতিহাসিক প্রেক্ষাপট">
            <BulletList items={story.historicalContext} accent="primary" />
          </Section>

          <Section id="significance" title="সাহিত্যিক গুরুত্ব">
            <BulletList items={story.significance} accent="accent" />
          </Section>
        </div>
      </div>
    </article>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20">
      <div className="flex items-baseline gap-3 mb-5">
        <div className="h-px flex-1 bg-border" />
        <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground">
          {title}
        </h3>
        <div className="h-px flex-1 bg-border" />
      </div>
      {children}
    </section>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border bg-card/40 p-4">
      <div className="text-[10px] uppercase tracking-[0.2em] text-primary/90 mb-2">
        {label}
      </div>
      <p className="text-sm text-foreground/90 leading-relaxed">{value}</p>
    </div>
  );
}

function BulletList({
  items,
  accent,
}: {
  items: string[];
  accent: "primary" | "accent";
}) {
  const dot = accent === "primary" ? "bg-primary" : "bg-accent";
  return (
    <ul className="space-y-3">
      {items.map((t, i) => (
        <li key={i} className="flex gap-3">
          <span className={`mt-2 h-1.5 w-1.5 rounded-full shrink-0 ${dot}`} />
          <span className="text-foreground/90 leading-relaxed">{t}</span>
        </li>
      ))}
    </ul>
  );
}
