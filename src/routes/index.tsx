import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/hasan/AppShell";

const TITLE = "হাসান আজিজুল হক গল্পবিশ্ব — বাংলা ছোটগল্পের বিশ্লেষণ";
const DESC =
  "হাসান আজিজুল হকের তিনটি নির্বাচিত ছোটগল্পের আধুনিক, মৌলিক সাহিত্য-বিশ্লেষণ: সমুদ্রের স্বপ্ন: শীতের অরণ্য, আত্মজা ও একটি করবী গাছ, এবং মা-মেয়ের সংসার।";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return <AppShell />;
}
