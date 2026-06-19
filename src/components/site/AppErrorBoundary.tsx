import { Component, type ErrorInfo, type ReactNode } from "react";
import { reportLovableError } from "@/lib/lovable-error-reporting";

type Props = {
  children: ReactNode;
  fallback?: (error: Error, reset: () => void) => ReactNode;
};

type State = { error: Error | null };

/**
 * Client-side React error boundary that catches render-phase exceptions
 * thrown anywhere inside the React tree (including ones not surfaced via
 * TanStack Router loaders). Pairs with the route-level errorComponents.
 */
export class AppErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    try {
      console.error("[AppErrorBoundary]", error, info);
      reportLovableError(error, {
        boundary: "react_app_error_boundary",
        componentStack: info.componentStack ?? null,
      });
    } catch {
      /* never let reporting break the fallback */
    }
  }

  reset = () => this.setState({ error: null });

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    if (this.props.fallback) return this.props.fallback(error, this.reset);

    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6">
        <div className="max-w-md text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-gold/80">
            Unexpected error
          </p>
          <h1 className="mt-3 font-display text-3xl text-foreground">
            অ্যাপে একটি সমস্যা হয়েছে
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            পৃষ্ঠাটি রিফ্রেশ করুন বা মূল পৃষ্ঠায় ফিরে যান।
          </p>
          <p className="mt-3 text-xs text-muted-foreground/70 break-words">
            {error.message || "Unknown error"}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              onClick={this.reset}
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              আবার চেষ্টা করুন
            </button>
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              মূল পৃষ্ঠায়
            </a>
          </div>
        </div>
      </div>
    );
  }
}
