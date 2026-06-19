import { createFileRoute, notFound } from "@tanstack/react-router";
import { playBySlug } from "@/data/plays";
import type { Play } from "@/data/types";
import { PlayHero } from "@/components/play/PlayHero";
import { Section } from "@/components/play/Section";
import { PlotAccordion } from "@/components/play/PlotAccordion";
import { CharacterGrid } from "@/components/play/CharacterGrid";
import { RelationshipMap } from "@/components/play/RelationshipMap";
import { Timeline } from "@/components/play/Timeline";
import { Symbols } from "@/components/play/Symbols";
import { Themes, LiteraryList } from "@/components/play/Themes";
import { FloatingTOC } from "@/components/play/FloatingTOC";

export const Route = createFileRoute("/natok/$slug")({
  loader: ({ params }) => {
    const play = playBySlug[params.slug as Play["slug"]];
    if (!play) throw notFound();
    return play;
  },
  head: ({ params, loaderData }) => {
    const play = loaderData;
    if (!play) return { meta: [] };
    const title = `${play.title} — রবীন্দ্রনাথ ঠাকুর | রবীন্দ্র নাট্যভুবন`;
    const desc = play.shortIntro + " — সারসংক্ষেপ, চরিত্র, প্রতীক ও থিম-বিশ্লেষণ।";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/natok/${params.slug}` },
        { property: "og:image", content: play.cover },
        { name: "twitter:image", content: play.cover },
      ],
      links: [{ rel: "canonical", href: `/natok/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: play.title,
            alternateName: play.titleRoman,
            inLanguage: "bn",
            genre: play.genre,
            author: { "@type": "Person", name: "রবীন্দ্রনাথ ঠাকুর" },
            description: play.shortIntro,
          }),
        },
      ],
    };
  },
  component: PlayPage,
});

function PlayPage() {
  const play = Route.useLoaderData();

  return (
    <>
      <PlayHero play={play} />
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-10 lg:grid-cols-[1fr_220px] lg:gap-12">
          <article>
            <Section id="summary" eyebrow="Synopsis" title="নাটকের সারসংক্ষেপ">
              <p className="rounded-2xl border border-[color:var(--color-gold)]/15 bg-[color:var(--color-card)]/70 p-6 leading-[1.95] text-[color:var(--color-foreground)]/95">
                {play.summary}
              </p>
            </Section>

            <Section id="plot" eyebrow="Plot" title="মূল কাহিনি">
              <PlotAccordion plot={play.plot} />
            </Section>

            <Section id="characters" eyebrow="Characters" title="চরিত্রসমূহ">
              <CharacterGrid characters={play.characters} />
            </Section>

            <Section id="relationships" eyebrow="Relations" title="চরিত্র সম্পর্ক">
              <RelationshipMap relationships={play.relationships} />
            </Section>

            <Section id="timeline" eyebrow="Timeline" title="ঘটনাক্রম">
              <Timeline events={play.timeline} />
            </Section>

            <Section id="symbols" eyebrow="Symbolism" title="প্রতীক ও রূপক">
              <Symbols symbols={play.symbols} />
            </Section>

            <Section id="significance" eyebrow="Significance" title="সাহিত্যিক গুরুত্ব">
              <LiteraryList items={play.literarySignificance} />
            </Section>

            <Section id="themes" eyebrow="Themes" title="মূল ভাবনা ও থিম">
              <Themes themes={play.themes} />
            </Section>
          </article>
          <FloatingTOC />
        </div>
      </div>
    </>
  );
}
