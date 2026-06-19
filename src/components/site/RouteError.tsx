import { Link, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { reportLovableError } from "@/lib/lovable-error-reporting";

type RouteErrorProps = {
  error: Error;
  reset: () => void;
  title?: string;
  description?: string;
  boundary?: string;
};

export function RouteError({
  error,
  reset,
  title = "কিছু একটা ভুল হয়েছে",
  description = "এই পৃষ্ঠাটি লোড করার সময় একটি সমস্যা হয়েছে। আবার চেষ্টা করুন বা মূল পৃষ্ঠায় ফিরে যান।",
  boundary = "route",
}: RouteErrorProps) {
  const router = useRouter();

  useEffect(() => {
    // Defensive: never let reporting itself crash the boundary
    try {
      console.error(`[${boundary}]`, error);
      reportLovableError(error, { boundary });
    } catch {
      /* swallow */
    }
  }, [error, boundary]);

  const message =
    error instanceof Error && error.message ? error.message : "Unknown error";

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-md text-center">
        <p className="text-[11px] uppercase tracking-[0.3em] text-gold/80">
          Error
        </p>
        <h1 className="mt-3 font-display text-3xl text-foreground">{title}</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
        <p className="mt-3 text-xs text-muted-foreground/70 break-words">
          {message}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              try {
                router.invalidate();
              } finally {
                reset();
              }
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            আবার চেষ্টা করুন
          </button>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            মূল পৃষ্ঠায়
          </Link>
        </div>
      </div>
    </div>
  );
}
