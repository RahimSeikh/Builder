export function SiteFooter() {
  return (
    <footer className="relative z-10 mt-24 border-t border-border/40 bg-ink/60">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="mx-auto mb-8 h-px w-32 gold-divider opacity-60" />
        <div className="flex flex-col items-center gap-3 text-center text-sm text-muted-foreground">
          <p className="font-display text-base text-foreground">
            শওকত নাট্যজগৎ — সৈয়দ ওয়ালীউল্লাহর নাট্যপাঠ-আর্কাইভ
          </p>
          <p className="max-w-xl text-xs leading-relaxed">
            এই আর্কাইভ কোনো নাট্যপাঠ্যের অনুলিপি বহন করে না। সমস্ত বিশ্লেষণ মৌলিক—Banglapedia, Wikipedia ও প্রাতিষ্ঠানিক সাহিত্য-সমালোচনার সংশ্লেষণ থেকে গঠিত।
          </p>
          <p className="text-[11px] uppercase tracking-[0.2em] text-gold/60">
            © {new Date().getFullYear()} — Literary Analysis Archive
          </p>
        </div>
      </div>
    </footer>
  );
}
