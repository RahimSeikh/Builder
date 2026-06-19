import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Nav } from "../components/layout/Nav";
import { Footer } from "../components/layout/Footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="max-w-md text-center">
          <h1 className="font-display text-7xl text-gradient-gold">৪০৪</h1>
          <h2 className="mt-4 font-display text-xl">পৃষ্ঠাটি পাওয়া যায়নি</h2>
          <p className="mt-2 text-sm text-[color:var(--color-muted-foreground)]">
            আপনি যে পৃষ্ঠাটি খুঁজছেন তা নেই বা সরিয়ে নেওয়া হয়েছে।
          </p>
          <div className="mt-6">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full bg-[color:var(--color-gold)] px-5 py-2.5 text-sm font-medium text-[color:var(--color-primary-foreground)] transition hover:bg-[color:var(--color-gold-soft)]"
            >
              হোমে ফিরুন
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-xl">এই পৃষ্ঠাটি লোড হয়নি</h1>
        <p className="mt-2 text-sm text-[color:var(--color-muted-foreground)]">
          কিছু একটা ভুল হয়েছে। আবার চেষ্টা করতে পারেন।
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-full bg-[color:var(--color-gold)] px-5 py-2.5 text-sm font-medium text-[color:var(--color-primary-foreground)]"
          >
            আবার চেষ্টা করুন
          </button>
          <a
            href="/"
            className="rounded-full border border-[color:var(--color-gold)]/40 px-5 py-2.5 text-sm"
          >
            হোম
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "রবীন্দ্র নাট্যভুবন — রবীন্দ্রনাথ ঠাকুরের নাট্যজগৎ" },
      {
        name: "description",
        content:
          "রবীন্দ্রনাথ ঠাকুরের তিনটি অমর নাটক—রক্তকরবী, রাজা ও অচলায়তন—এর সারসংক্ষেপ, চরিত্র, ঘটনাক্রম, প্রতীক ও থিম-বিশ্লেষণ।",
      },
      { name: "author", content: "রবীন্দ্র নাট্যভুবন" },
      { property: "og:site_name", content: "রবীন্দ্র নাট্যভুবন" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "রবীন্দ্র নাট্যভুবন — রবীন্দ্রনাথ ঠাকুরের নাট্যজগৎ" },
      { name: "twitter:title", content: "রবীন্দ্র নাট্যভুবন — রবীন্দ্রনাথ ঠাকুরের নাট্যজগৎ" },
      { name: "description", content: "A Bengali literature website showcasing Rabindranath Tagore's plays with detailed analysis and rich visuals." },
      { property: "og:description", content: "A Bengali literature website showcasing Rabindranath Tagore's plays with detailed analysis and rich visuals." },
      { name: "twitter:description", content: "A Bengali literature website showcasing Rabindranath Tagore's plays with detailed analysis and rich visuals." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/fbcbb668-96cd-4a45-a442-57d133b582b1/id-preview-eddffeb9--6659f8c2-5c4e-488d-b54a-7012a152a45a.lovable.app-1781098736483.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/fbcbb668-96cd-4a45-a442-57d133b582b1/id-preview-eddffeb9--6659f8c2-5c4e-488d-b54a-7012a152a45a.lovable.app-1781098736483.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&family=Noto+Serif+Bengali:wght@400;500;600;700;800&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "রবীন্দ্র নাট্যভুবন",
          inLanguage: "bn",
          description:
            "রবীন্দ্রনাথ ঠাকুরের নাট্যজগতের ডিজিটাল আর্কাইভ—রক্তকরবী, রাজা ও অচলায়তন।",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="bn">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <Nav />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
