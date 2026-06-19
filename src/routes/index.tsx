import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/Hero";
import { AboutTagore } from "@/components/home/AboutTagore";
import { PlaysGrid } from "@/components/home/PlaysGrid";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "রবীন্দ্র নাট্যভুবন — রবীন্দ্রনাথ ঠাকুরের নাট্যজগৎ" },
      {
        name: "description",
        content:
          "রবীন্দ্রনাথ ঠাকুরের জীবন ও তাঁর তিনটি প্রতীকধর্মী নাটক—রক্তকরবী, রাজা ও অচলায়তন—এর বিস্তৃত সাহিত্যিক বিশ্লেষণ।",
      },
      { property: "og:title", content: "রবীন্দ্র নাট্যভুবন" },
      {
        property: "og:description",
        content:
          "রবীন্দ্রনাথ ঠাকুরের নাট্যজগতের ডিজিটাল আর্কাইভ—সারসংক্ষেপ, চরিত্র, প্রতীক ও থিম-বিশ্লেষণ।",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "রবীন্দ্রনাথ ঠাকুর",
          alternateName: "Rabindranath Tagore",
          birthDate: "1861-05-07",
          deathDate: "1941-08-07",
          nationality: "Indian",
          award: "Nobel Prize in Literature (1913)",
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <AboutTagore />
      <PlaysGrid />
    </>
  );
}
