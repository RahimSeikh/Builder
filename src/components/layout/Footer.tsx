export function Footer() {
  return (
    <footer className="mt-24 border-t border-[color:var(--color-gold)]/15 bg-[oklch(0.13_0.04_265)]">
      <div className="mx-auto max-w-6xl px-5 py-12 text-sm text-[color:var(--color-muted-foreground)]">
        <div className="gold-rule mb-8" />
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="font-display text-lg text-gradient-gold">রবীন্দ্র নাট্যভুবন</div>
            <p className="mt-3 leading-relaxed">
              রবীন্দ্রনাথ ঠাকুরের নাট্যজগতের একটি ডিজিটাল আর্কাইভ—শিক্ষার্থী, গবেষক ও সাহিত্যপ্রেমীদের জন্য।
            </p>
          </div>
          <div>
            <div className="text-[color:var(--color-foreground)] font-semibold mb-3">নাটকসমূহ</div>
            <ul className="space-y-2">
              <li>রক্তকরবী</li>
              <li>রাজা</li>
              <li>অচলায়তন</li>
            </ul>
          </div>
          <div>
            <div className="text-[color:var(--color-foreground)] font-semibold mb-3">সূত্র</div>
            <p className="leading-relaxed">
              বিষয়বস্তু একাধিক সর্বজনপরিচিত সাহিত্য-সূত্রের ভিত্তিতে নিজস্ব ভাষায় রচিত। মূল নাট্যের কোনো দীর্ঘ উদ্ধৃতি ব্যবহৃত হয়নি।
            </p>
          </div>
        </div>
        <div className="mt-10 text-center text-xs text-[color:var(--color-muted-foreground)]/80">
          © {new Date().getFullYear()} রবীন্দ্র নাট্যভুবন
        </div>
      </div>
    </footer>
  );
}
