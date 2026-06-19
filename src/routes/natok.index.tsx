import { createFileRoute } from "@tanstack/react-router";
import { PlaysGrid } from "@/components/home/PlaysGrid";

export const Route = createFileRoute("/natok/")({
  head: () => ({
    meta: [
      { title: "নাটকসমূহ — রবীন্দ্র নাট্যভুবন" },
      {
        name: "description",
        content:
          "রবীন্দ্রনাথ ঠাকুরের তিনটি প্রতীকধর্মী নাটক—রক্তকরবী, রাজা ও অচলায়তন।",
      },
      { property: "og:title", content: "নাটকসমূহ — রবীন্দ্র নাট্যভুবন" },
      {
        property: "og:description",
        content: "রবীন্দ্রনাথ ঠাকুরের তিনটি অমর নাটকের সংগ্রহ।",
      },
      { property: "og:url", content: "/natok" },
    ],
    links: [{ rel: "canonical", href: "/natok" }],
  }),
  component: NatokIndex,
});

function NatokIndex() {
  return (
    <div className="pt-6">
      <PlaysGrid />
    </div>
  );
}
