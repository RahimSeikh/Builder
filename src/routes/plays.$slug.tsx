import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { FogOverlay } from "@/components/site/FogOverlay";
import { SectionHeader } from "@/components/site/SectionHeader";
import { RouteError } from "@/components/site/RouteError";
import { getPlay, plays } from "@/content/plays";

export const Route = createFileRoute("/plays/$slug")({
  loader: ({ params }) => {
    const play = getPlay(params.slug);
    if (!play) throw notFound();
    return { play };
  },
  head: ({ params }) => {
    const play = getPlay(params.slug);
    if (!play) return { meta: [{ title: "নাটক পাওয়া যায়নি" }] };
    const title = `${play.title} — অস্তিত্ববাদী বিশ্লেষণ | সৈয়দ ওয়ালীউল্লাহ`;
    const desc = `${play.title} (${play.year}) — ${play.shortDescription}`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/plays/${params.slug}` },
        { property: "og:image", content: play.cover },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: play.cover },
      ],
      links: [{ rel: "canonical", href: `/plays/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: play.title,
            datePublished: String(play.year),
            inLanguage: "bn",
            author: {
              "@type": "Person",
              name: "Syed Waliullah",
            },
            genre: ["Drama", "Existential Theatre", "Bengali Literature"],
            description: play.shortDescription,
            image: play.cover,
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <p className="text-gold">নাটকটি পাওয়া যায়নি</p>
        <Link to="/" className="mt-4 inline-block text-sm underline">
          মূল পৃষ্ঠায় ফিরে যান
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <RouteError
      error={error}
      reset={reset}
      title="নাটকটি দেখাতে সমস্যা হয়েছে"
      boundary="route:/plays/$slug"
    />
  ),
  component: PlayPage,
});

const TOC = [
  { id: "overview", label: "সারসংক্ষেপ" },
  { id: "existential", label: "অস্তিত্ববাদী বিশ্লেষণ" },
  { id: "structure", label: "নাট্য কাঠামো" },
  { id: "characters", label: "চরিত্র বিশ্লেষণ" },
  { id: "symbols", label: "প্রতীক ও রূপক" },
  { id: "context", label: "সামাজিক প্রেক্ষাপট" },
  { id: "importance", label: "সাহিত্যিক গুরুত্ব" },
];

function PlayPage() {
  const { play } = Route.useLoaderData() as { play: import("@/content/plays").Play };
  const others = plays.filter((p) => p.slug !== play.slug);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <FogOverlay />
      <div className="relative z-10">
        <SiteHeader />

        {/* Hero */}
        <section className="relative">
          <div className="relative h-[55vh] min-h-[380px] w-full overflow-hidden">
            <img
              src={play.cover}
              alt={`${play.title} — প্রতীকী মঞ্চচিত্র`}
              className="h-full w-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/30" />
            <div className="absolute inset-0 spotlight" />
          </div>
          <div className="relative -mt-40 px-5 sm:px-8">
            <div className="mx-auto max-w-4xl">
              <Link
                to="/"
                className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold/80 hover:text-gold"
              >
                ← আর্কাইভ
              </Link>
              <p className="text-[11px] uppercase tracking-[0.3em] text-gold">
                {play.year} · Syed Waliullah
              </p>
              <h1 className="mt-3 font-display text-5xl font-semibold text-foreground text-shadow-stage sm:text-7xl">
                {play.title}
              </h1>
              <p className="mt-4 max-w-2xl text-lg italic text-muted-foreground">
                {play.tagline}
              </p>
              <div className="mt-6 h-px w-24 gold-divider" />
            </div>
          </div>
        </section>

        {/* Body with TOC */}
        <div className="mx-auto mt-16 grid max-w-6xl gap-12 px-5 pb-10 sm:px-8 lg:grid-cols-[220px_1fr]">
          {/* TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-8">
              <p className="mb-4 text-[10px] uppercase tracking-[0.25em] text-gold/70">
                বিশ্লেষণের স্তর
              </p>
              <nav className="flex flex-col gap-2 border-l border-border/60 pl-4 text-sm">
                {TOC.map((t) => (
                  <a
                    key={t.id}
                    href={`#${t.id}`}
                    className="text-muted-foreground transition-colors hover:text-gold"
                  >
                    {t.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <article className="min-w-0">
            {/* Overview */}
            <Section id="overview" eyebrow="01" title="সারসংক্ষেপ">
              <p className="leading-relaxed text-foreground/85">
                {play.overview.context}
              </p>
              <dl className="mt-6 grid gap-4 sm:grid-cols-3">
                <Meta label="কাল" value={play.overview.period} />
                <Meta label="মঞ্চ-পরিসর" value={play.overview.setting} />
                <Meta label="মনস্তাত্ত্বিক সুর" value={play.overview.tone} />
              </dl>
            </Section>

            {/* Existential */}
            <Section id="existential" eyebrow="02" title="অস্তিত্ববাদী বিশ্লেষণ">
              <ul className="space-y-4">
                {play.existential.map((point, i) => (
                  <li
                    key={i}
                    className="relative rounded-md border border-border/50 bg-card/40 p-5 pl-14 leading-relaxed text-foreground/85"
                  >
                    <span className="absolute left-5 top-5 font-display text-sm text-gold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </Section>

            {/* Structure */}
            <Section id="structure" eyebrow="03" title="নাট্য কাঠামো">
              <div className="grid gap-5 sm:grid-cols-2">
                <StructureBox label="সূচনা · Exposition" body={play.structure.exposition} />
                <StructureBox label="দ্বন্দ্ব · Conflict" body={play.structure.conflict} />
                <StructureBox label="চূড়া · Climax" body={play.structure.climax} />
                <StructureBox label="পরিণতি · Resolution" body={play.structure.resolution} />
              </div>
            </Section>

            {/* Characters */}
            <Section id="characters" eyebrow="04" title="চরিত্র বিশ্লেষণ">
              <p className="mb-5 text-xs uppercase tracking-[0.2em] text-gold/70">
                যেকোনো চরিত্রে ক্লিক করুন · বিস্তারিত বিশ্লেষণ
              </p>
              <div className="space-y-5">
                {play.characters.map((c) => (
                  <Link
                    key={c.slug}
                    to="/plays/$slug/character/$charSlug"
                    params={{ slug: play.slug, charSlug: c.slug }}
                    className="group block rounded-md border border-border/50 bg-card/40 p-6 transition-all hover:border-gold/60 hover:-translate-y-0.5"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-display text-2xl text-foreground group-hover:text-gold">
                        {c.name}
                      </h3>
                      <p className="text-xs uppercase tracking-[0.2em] text-gold/80">
                        {c.role}
                      </p>
                    </div>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <CharacterField label="মনস্তত্ত্ব" body={c.psychology} />
                      <CharacterField label="প্রতীকতা" body={c.symbolism} />
                    </div>
                    <p className="mt-4 inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.25em] text-gold/80 group-hover:text-gold">
                      বিস্তারিত পড়ুন →
                    </p>
                  </Link>
                ))}
              </div>
            </Section>


            {/* Symbols */}
            <Section id="symbols" eyebrow="05" title="প্রতীক ও রূপক">
              <div className="grid gap-4 sm:grid-cols-2">
                {play.symbols.map((s) => (
                  <div
                    key={s.symbol}
                    className="group relative overflow-hidden rounded-md border border-border/50 bg-card/40 p-5"
                  >
                    <div className="absolute inset-y-0 left-0 w-[2px] bg-gold/60 transition-all group-hover:w-1" />
                    <p className="font-display text-lg text-gold">{s.symbol}</p>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                      {s.meaning}
                    </p>
                  </div>
                ))}
              </div>
            </Section>

            {/* Context */}
            <Section id="context" eyebrow="06" title="সামাজিক ও দার্শনিক প্রেক্ষাপট">
              <p className="leading-relaxed text-foreground/85">{play.socialContext}</p>
            </Section>

            {/* Importance */}
            <Section id="importance" eyebrow="07" title="সাহিত্যিক গুরুত্ব">
              <p className="leading-relaxed text-foreground/85">{play.literaryImportance}</p>
            </Section>

            {/* Others */}
            <div className="mt-20 border-t border-border/40 pt-12">
              <p className="mb-6 text-[11px] uppercase tracking-[0.25em] text-gold/80">
                অন্যান্য নাটক
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {others.map((o) => (
                  <Link
                    key={o.slug}
                    to="/plays/$slug"
                    params={{ slug: o.slug }}
                    className="group rounded-md border border-border/50 bg-card/40 p-5 transition-all hover:border-gold/60 hover:-translate-y-0.5"
                  >
                    <p className="text-[10px] uppercase tracking-[0.25em] text-gold/70">
                      {o.year}
                    </p>
                    <p className="mt-1 font-display text-xl text-foreground group-hover:text-gold">
                      {o.title}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">{o.tagline}</p>
                  </Link>
                ))}
              </div>
            </div>
          </article>
        </div>

        <SiteFooter />
      </div>
    </div>
  );
}

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 pb-16">
      <SectionHeader eyebrow={eyebrow} title={title} />
      {children}
    </section>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border/50 bg-card/30 p-4">
      <dt className="text-[10px] uppercase tracking-[0.22em] text-gold/80">
        {label}
      </dt>
      <dd className="mt-2 text-sm leading-relaxed text-foreground/85">{value}</dd>
    </div>
  );
}

function StructureBox({ label, body }: { label: string; body: string }) {
  return (
    <div className="relative overflow-hidden rounded-md border border-border/50 bg-card/40 p-5">
      <p className="text-[11px] uppercase tracking-[0.22em] text-gold">{label}</p>
      <div className="mt-2 h-px w-10 gold-divider" />
      <p className="mt-3 text-sm leading-relaxed text-foreground/85">{body}</p>
    </div>
  );
}

function CharacterField({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.22em] text-gold/80">{label}</p>
      <p className="mt-1.5 text-sm leading-relaxed text-foreground/85">{body}</p>
    </div>
  );
}
