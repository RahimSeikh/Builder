import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { FogOverlay } from "@/components/site/FogOverlay";
import { SectionHeader } from "@/components/site/SectionHeader";
import { PlayCard } from "@/components/site/PlayCard";
import { plays } from "@/content/plays";
import { RouteError } from "@/components/site/RouteError";
import { author } from "@/content/author";
import waliullahPortrait from "@/assets/waliullah.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "শওকত নাট্যজগৎ — সৈয়দ ওয়ালীউল্লাহর নাট্য-আর্কাইভ" },
      {
        name: "description",
        content:
          "সৈয়দ ওয়ালীউল্লাহর তিনটি নাটক—বহিপীর, উজানে মৃত্যু, তরঙ্গভঙ্গ—এর অস্তিত্ববাদী বিশ্লেষণ, চরিত্র-পাঠ ও প্রতীকী ব্যাখ্যা। আধুনিক বাংলা নাট্যসাহিত্যের একটি ডিজিটাল অস্তিত্ববাদী আর্কাইভ।",
      },
      {
        property: "og:title",
        content: "শওকত নাট্যজগৎ — সৈয়দ ওয়ালীউল্লাহর নাট্য-আর্কাইভ",
      },
      {
        property: "og:description",
        content:
          "বহিপীর · উজানে মৃত্যু · তরঙ্গভঙ্গ — অস্তিত্ববাদী বিশ্লেষণ ও প্রতীকী পাঠ।",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Syed Waliullah",
          alternateName: "সৈয়দ ওয়ালীউল্লাহ",
          birthDate: "1922-08-15",
          deathDate: "1971-10-10",
          nationality: "Bangladeshi",
          jobTitle: "Playwright, Novelist",
          description:
            "Modern Bengali playwright and novelist, foundational voice of existential drama in Bengali literature.",
          knowsAbout: [
            "Bengali theatre",
            "Existentialism",
            "Modern Bengali literature",
          ],
        }),
      },
    ],
  }),
  component: HomePage,
  errorComponent: ({ error, reset }) => (
    <RouteError
      error={error}
      reset={reset}
      title="হোম পৃষ্ঠা লোড করতে সমস্যা হয়েছে"
      boundary="route:/"
    />
  ),
});

function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <FogOverlay />
      <div className="relative z-10">
        <SiteHeader />

        {/* HERO */}
        <section className="relative px-5 pt-16 pb-24 sm:px-8 sm:pt-24 sm:pb-32">
          <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1fr_1.2fr] md:items-center">
            <div className="relative mx-auto w-full max-w-sm animate-fade-up">
              <div className="absolute -inset-6 spotlight blur-xl" aria-hidden />
              <div className="relative overflow-hidden rounded-sm border border-gold/20"
                   style={{ boxShadow: "var(--shadow-stage)" }}>
                <img
                  src={waliullahPortrait}
                  alt="সৈয়দ ওয়ালীউল্লাহর প্রতীকী মঞ্চ-আলোক প্রতিকৃতি"
                  className="h-full w-full object-cover grayscale-[15%]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
              </div>
            </div>
            <div className="animate-fade-up" style={{ animationDelay: "0.15s" }}>
              <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-gold">
                A Digital Theatre Archive
              </p>
              <h1 className="font-display text-4xl font-semibold leading-tight text-foreground text-shadow-stage sm:text-6xl">
                {author.name}
              </h1>
              <p className="mt-3 text-base tracking-wider text-gold/90">
                {author.born} — {author.died}
              </p>
              <div className="mt-6 h-px w-24 gold-divider" />
              <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/85 sm:text-lg">
                {author.intro}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#plays"
                  className="inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:shadow-[0_0_30px_oklch(0.82_0.14_80/0.4)]"
                >
                  নাটক অন্বেষণ করুন
                  <span aria-hidden>↓</span>
                </a>
                <a
                  href="#about"
                  className="inline-flex items-center gap-2 rounded-sm border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-gold/60 hover:text-gold"
                >
                  লেখক-পরিচিতি
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="relative px-5 py-20 sm:px-8">
          <div className="mx-auto max-w-4xl">
            <SectionHeader
              eyebrow="About the Author"
              title="মঞ্চে নির্মিত অস্তিত্বের প্রশ্ন"
            >
              একজন ঔপন্যাসিকের ছায়ায় ঢাকা পড়ে যাওয়া যে নাট্যকার বাংলা মঞ্চকে রিয়ালিজমের সীমা থেকে দার্শনিক প্রতীকবাদে নিয়ে গেছেন—এই বিভাগ তাঁরই পাঠ।
            </SectionHeader>
            <div className="grid gap-10 md:grid-cols-2">
              {author.sections.map((s, i) => (
                <article
                  key={s.title}
                  className="relative rounded-lg border border-border/50 bg-card/40 p-6 backdrop-blur-sm animate-fade-up"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <div className="absolute left-6 top-0 h-px w-12 -translate-y-px gold-divider" />
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-foreground/80">
                    {s.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* PLAYS */}
        <section id="plays" className="relative px-5 py-20 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <SectionHeader
              eyebrow="The Plays · তিনটি নাটক"
              title="নাট্যসংগ্রহ"
            >
              তিনটি নাটক—তিনটি ভিন্ন স্তরে একই দার্শনিক অনুসন্ধান: ব্যক্তি কীভাবে বহন করে নিজের অস্তিত্বের ভার, এবং সমাজ কীভাবে সেই ভারকে রূপান্তরিত করে নিপীড়নে।
            </SectionHeader>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {plays.map((p) => (
                <PlayCard key={p.slug} play={p} />
              ))}
            </div>
          </div>
        </section>

        <SiteFooter />
      </div>
    </div>
  );
}
