import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { WriterView } from "./WriterView";
import { StoryView } from "./StoryView";
import { stories, writer } from "@/data/hasan";

export type Selection = { kind: "writer" } | { kind: "story"; id: string };

function selectionKey(s: Selection) {
  return s.kind === "writer" ? "writer" : `story:${s.id}`;
}

function fromHash(): Selection {
  if (typeof window === "undefined") return { kind: "writer" };
  const h = window.location.hash.replace(/^#/, "");
  if (h === "writer" || h === "") return { kind: "writer" };
  if (h.startsWith("story:")) {
    const id = h.slice("story:".length);
    if (stories.some((s) => s.id === id)) return { kind: "story", id };
  }
  return { kind: "writer" };
}

export function AppShell() {
  const [selection, setSelection] = useState<Selection>(() => fromHash());
  const [mobileOpen, setMobileOpen] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const scrollMap = useRef(new Map<string, number>());
  const prevKey = useRef<string>(selectionKey(selection));

  // hash sync (both ways)
  useEffect(() => {
    const key = selectionKey(selection);
    if (window.location.hash.replace(/^#/, "") !== key) {
      history.replaceState(null, "", `#${key}`);
    }
  }, [selection]);

  useEffect(() => {
    const onHash = () => setSelection(fromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // dynamic title + meta
  useEffect(() => {
    const base = "হাসান আজিজুল হক গল্পবিশ্ব";
    let title = base;
    let desc = writer.intro;
    if (selection.kind === "story") {
      const s = stories.find((x) => x.id === selection.id);
      if (s) {
        title = `${s.title} — ${base}`;
        desc = s.tagline;
      }
    }
    document.title = title;
    setMeta("description", desc);
    setMeta("og:title", title, true);
    setMeta("og:description", desc, true);
    setMeta("twitter:title", title);
    setMeta("twitter:description", desc);
  }, [selection]);

  // preserve scroll per selection
  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;
    // save outgoing
    scrollMap.current.set(prevKey.current, el.scrollTop);
    const incoming = selectionKey(selection);
    const saved = scrollMap.current.get(incoming) ?? 0;
    // restore after frame so new content is mounted
    requestAnimationFrame(() => {
      el.scrollTop = saved;
    });
    prevKey.current = incoming;
  }, [selection]);

  const handleSelect = (s: Selection) => {
    setSelection(s);
    setMobileOpen(false);
  };

  const key = selectionKey(selection);

  return (
    <div className="relative z-10 min-h-screen w-full flex flex-col lg:flex-row">
      {/* mobile header */}
      <header className="lg:hidden sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/85 backdrop-blur px-4 h-14">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 -ml-2 rounded-md hover:bg-secondary text-foreground"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="font-display text-base font-semibold">গল্পবিশ্ব</div>
        <div className="w-9" />
      </header>

      {/* desktop sidebar */}
      <div className="hidden lg:block w-[300px] shrink-0 h-screen sticky top-0">
        <Sidebar selection={selection} onSelect={handleSelect} />
      </div>

      {/* mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 bg-background/70 backdrop-blur-sm z-40"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
              className="lg:hidden fixed inset-y-0 left-0 z-50 w-[82%] max-w-[320px]"
            >
              <Sidebar
                selection={selection}
                onSelect={handleSelect}
                onClose={() => setMobileOpen(false)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* main content */}
      <main
        ref={mainRef}
        className="flex-1 min-w-0 lg:h-screen lg:overflow-y-auto"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.2, 0.65, 0.3, 0.9] }}
          >
            {selection.kind === "writer" ? (
              <WriterView onSelectStory={handleSelect} />
            ) : (
              <StoryViewWrapper id={selection.id} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

function StoryViewWrapper({ id }: { id: string }) {
  const story = stories.find((s) => s.id === id);
  if (!story) return null;
  return <StoryView story={story} />;
}

function setMeta(name: string, content: string, isProperty = false) {
  if (typeof document === "undefined") return;
  const attr = isProperty ? "property" : "name";
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${name}"]`
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}
