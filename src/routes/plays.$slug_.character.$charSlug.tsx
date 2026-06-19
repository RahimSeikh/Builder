import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { FogOverlay } from "@/components/site/FogOverlay";
import { RouteError } from "@/components/site/RouteError";
import { getCharacter } from "@/content/plays";
import { getRelations } from "@/content/relations";

export const Route = createFileRoute("/plays/$slug_/character/$charSlug")({
  loader: ({ params }) => {
    const result = getCharacter(params.slug, params.charSlug);
    if (!result) throw notFound();
    return result;
  },
  head: ({ params }) => {
    const result = getCharacter(params.slug, params.charSlug);
    if (!result)
      return { meta: [{ title: "চরিত্র পাওয়া যায়নি" }] };
    const { play, character } = result;
    const title = `${character.name} — ${play.title} | চরিত্র বিশ্লেষণ`;
    const desc = `${character.name} (${character.role}) — ${character.psychology}`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
      ],
      links: [
        {
          rel: "canonical",
          href: `/plays/${params.slug}/character/${params.charSlug}`,
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <p className="text-gold">চরিত্রটি পাওয়া যায়নি</p>
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
      title="চরিত্রটি দেখাতে সমস্যা হয়েছে"
      boundary="route:/plays/$slug/character/$charSlug"
    />
  ),
  component: CharacterPage,
});

function CharacterPage() {
  const { play, character } = Route.useLoaderData() as {
    play: import("@/content/plays").Play;
    character: import("@/content/plays").Character;
  };
  const others = play.characters.filter((c: import("@/content/plays").Character) => c.slug !== character.slug);
  const rels = getRelations(play.slug, character.slug)
    .map((r) => {
      const target = play.characters.find((c) => c.slug === r.slug);
      return target ? { ...r, target } : null;
    })
    .filter((x): x is { slug: string; label: string; note: string; target: import("@/content/plays").Character } => x !== null);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <FogOverlay />
      <div className="relative z-10">
        <SiteHeader />

        {/* Hero */}
        <section className="relative">
          <div className="relative h-[40vh] min-h-[300px] w-full overflow-hidden">
            <img
              src={play.cover}
              alt={`${play.title} — মঞ্চ পরিবেশ`}
              className="h-full w-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/40" />
            <div className="absolute inset-0 spotlight" />
          </div>
          <div className="relative -mt-32 px-5 sm:px-8">
            <div className="mx-auto max-w-3xl">
              <Link
                to="/plays/$slug"
                params={{ slug: play.slug }}
                className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold/80 hover:text-gold"
              >
                ← {play.title}
              </Link>
              <p className="text-[11px] uppercase tracking-[0.3em] text-gold">
                চরিত্র · {play.title}
              </p>
              <h1 className="mt-3 font-display text-5xl font-semibold text-foreground text-shadow-stage sm:text-6xl">
                {character.name}
              </h1>
              <p className="mt-3 text-lg italic text-muted-foreground">
                {character.role}
              </p>
              <div className="mt-6 h-px w-24 gold-divider" />
            </div>
          </div>
        </section>

        {/* Body */}
        <div className="mx-auto mt-16 max-w-3xl px-5 pb-10 sm:px-8">
          {/* Quick facets */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Facet label="মনস্তত্ত্ব" body={character.psychology} />
            <Facet label="প্রতীকতা" body={character.symbolism} />
          </div>

          {/* Detailed essay */}
          <section className="mt-14">
            <p className="text-[11px] uppercase tracking-[0.25em] text-gold">
              বিস্তারিত বিশ্লেষণ
            </p>
            <h2 className="mt-2 font-display text-3xl text-foreground">
              {character.name}-এর গভীর পাঠ
            </h2>
            <div className="mt-3 h-px w-16 gold-divider" />

            <div className="mt-8 space-y-6">
              {character.detailed.map((para: string, i: number) => (
                <p
                  key={i}
                  className="relative pl-6 text-base leading-loose text-foreground/85 sm:text-[1.05rem]"
                >
                  <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-gold/70" />
                  {para}
                </p>
              ))}
            </div>
          </section>

          {/* Relationships & thematic parallels */}
          {rels.length > 0 && (
            <section className="mt-20 border-t border-border/40 pt-12">
              <p className="text-[11px] uppercase tracking-[0.25em] text-gold">
                সম্পর্ক ও সমান্তরাল
              </p>
              <h2 className="mt-2 font-display text-3xl text-foreground">
                {character.name}-এর চরিত্র-জাল
              </h2>
              <div className="mt-3 h-px w-16 gold-divider" />
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                একই নাটকের অন্য চরিত্রদের সঙ্গে এই চরিত্রের আত্মিক, পারিবারিক ও দার্শনিক সমান্তরাল—প্রতিটি কার্ডে ক্লিক করে সংশ্লিষ্ট চরিত্রে যান।
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {rels.map((r) => (
                  <Link
                    key={r.slug}
                    to="/plays/$slug/character/$charSlug"
                    params={{ slug: play.slug, charSlug: r.slug }}
                    className="group relative overflow-hidden rounded-md border border-border/50 bg-card/40 p-5 transition-all hover:border-gold/70 hover:-translate-y-0.5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-display text-lg text-foreground group-hover:text-gold">
                        {r.target.name}
                      </p>
                      <span className="shrink-0 text-[10px] uppercase tracking-[0.18em] text-gold/80">
                        →
                      </span>
                    </div>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-gold/70">
                      {r.label}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-foreground/80">
                      {r.note}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Other characters in this play */}
          {others.length > 0 && (
            <div className="mt-20 border-t border-border/40 pt-12">
              <p className="mb-6 text-[11px] uppercase tracking-[0.25em] text-gold/80">
                একই নাটকের অন্য চরিত্র
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {others.map((c: import("@/content/plays").Character) => (
                  <Link
                    key={c.slug}
                    to="/plays/$slug/character/$charSlug"
                    params={{ slug: play.slug, charSlug: c.slug }}
                    className="group rounded-md border border-border/50 bg-card/40 p-4 transition-all hover:border-gold/60 hover:-translate-y-0.5"
                  >
                    <p className="font-display text-lg text-foreground group-hover:text-gold">
                      {c.name}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-gold/70">
                      {c.role}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <SiteFooter />
      </div>
    </div>
  );
}

function Facet({ label, body }: { label: string; body: string }) {
  return (
    <div className="rounded-md border border-border/50 bg-card/40 p-5">
      <p className="text-[10px] uppercase tracking-[0.22em] text-gold/80">
        {label}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-foreground/85">{body}</p>
    </div>
  );
}
