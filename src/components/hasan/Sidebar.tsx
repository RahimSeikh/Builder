import { motion } from "framer-motion";
import { BookOpen, User2, X } from "lucide-react";
import { stories, writer } from "@/data/hasan";
import type { Selection } from "./AppShell";
import { cn } from "@/lib/utils";

type Props = {
  selection: Selection;
  onSelect: (s: Selection) => void;
  onClose?: () => void;
};

export function Sidebar({ selection, onSelect, onClose }: Props) {
  const activeKey =
    selection.kind === "writer" ? "writer" : `story:${selection.id}`;

  return (
    <aside className="h-full w-full bg-sidebar/95 backdrop-blur-sm border-r border-sidebar-border flex flex-col">
      <div className="flex items-center justify-between p-5 border-b border-sidebar-border">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-lg font-semibold text-foreground leading-tight">
            গল্পবিশ্ব
          </span>
          <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            HAHQ
          </span>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-md hover:bg-sidebar-accent text-muted-foreground"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-6">
        <NavGroup label="লেখক">
          <NavItem
            active={activeKey === "writer"}
            onClick={() => onSelect({ kind: "writer" })}
            icon={<User2 className="h-4 w-4" />}
            title={writer.name}
            subtitle={writer.lifespan}
          />
        </NavGroup>

        <NavGroup label="নির্বাচিত গল্প">
          {stories.map((s, i) => (
            <NavItem
              key={s.id}
              active={activeKey === `story:${s.id}`}
              onClick={() => onSelect({ kind: "story", id: s.id })}
              icon={<BookOpen className="h-4 w-4" />}
              title={s.title}
              subtitle={`গল্প ${toBn(i + 1)} • ${s.tagline.slice(0, 28)}…`}
            />
          ))}
        </NavGroup>
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <p className="text-[11px] leading-relaxed text-muted-foreground">
          মৌলিক বিশ্লেষণ ও পাঠ্য-ভাষ্য; কোনো গল্পের পাঠ্য অংশ পুনরুৎপাদিত নয়।
        </p>
      </div>
    </aside>
  );
}

function NavGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <div className="px-2 text-[10px] uppercase tracking-[0.22em] text-muted-foreground/80">
        {label}
      </div>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function NavItem({
  active,
  onClick,
  icon,
  title,
  subtitle,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative w-full text-left rounded-md px-3 py-2.5 transition-colors flex items-start gap-3",
        active
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "hover:bg-sidebar-accent/60 text-sidebar-foreground/85"
      )}
    >
      {active && (
        <motion.span
          layoutId="active-bar"
          className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r bg-primary"
        />
      )}
      <span
        className={cn(
          "mt-0.5 shrink-0 rounded-sm p-1 transition-colors",
          active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
        )}
      >
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block font-display text-[15px] leading-snug truncate">
          {title}
        </span>
        <span className="block text-[11px] text-muted-foreground truncate">
          {subtitle}
        </span>
      </span>
    </button>
  );
}

function toBn(n: number) {
  const d = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(n)
    .split("")
    .map((c) => d[Number(c)] ?? c)
    .join("");
}
