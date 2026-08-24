import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  Check,
  Copy,
  Mail,
  RefreshCw,
  Sparkles,
  UserRound,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SAMPLE_EMAIL } from "@/components/briefpilot/mock";
import { analyzeEmail, initialsOf, type AnalysisResult } from "@/lib/api";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BriefPilot — AI creative request intake for design teams" },
      {
        name: "description",
        content:
          "BriefPilot reads client emails, extracts the brief, flags missing details, routes to the right designer and drafts the follow-up — automatically.",
      },
      { property: "og:title", content: "BriefPilot — AI creative request intake" },
      {
        property: "og:description",
        content:
          "Turn messy client emails into structured briefs, designer assignments and follow-up drafts in seconds.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const STEPS = [
  { n: "01", title: "Paste the email", body: "Drop in the raw client message, however messy it is." },
  { n: "02", title: "AI extracts the brief", body: "Request, purpose, guidelines, budget and deadline." },
  { n: "03", title: "Route + follow up", body: "Assign the right designer and draft the reply." },
];

function Index() {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyze = async () => {
    if (!email.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const data = await analyzeEmail(email);
      setResult(data);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? `Couldn't analyze this request: ${err.message}`
          : "Couldn't analyze this request. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setEmail("");
    setCopied(false);
    setError(null);
  };

  const copy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.follow_up_email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <a href="/" className="flex items-center gap-2.5">
            <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="size-4" />
            </span>
            <span className="font-display text-lg font-semibold tracking-tight">BriefPilot</span>
          </a>
          <Button
            size="sm"
            className="rounded-full bg-primary px-5 text-primary-foreground hover:bg-primary/90"
            onClick={() => document.getElementById("workspace")?.scrollIntoView({ behavior: "smooth" })}
          >
            Try the demo
          </Button>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="grid-backdrop pointer-events-none absolute inset-0 opacity-40" />
          <div
            className="pointer-events-none absolute left-1/2 top-[-14rem] size-[38rem] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
            style={{ backgroundImage: "var(--gradient-primary)" }}
          />
          <div className="relative mx-auto max-w-3xl px-6 pb-20 pt-24 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3.5 py-1.5 text-xs text-muted-foreground">
              <span className="size-1.5 rounded-full bg-success" />
              Powered by Gemini · built for design agencies
            </span>
            <h1 className="mt-7 text-5xl font-semibold leading-[1.05] sm:text-6xl">
              Client emails in.
              <br />
              <span className="text-gradient">Ready-to-work briefs out.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
              BriefPilot reads unstructured creative requests, extracts what matters, flags what's
              missing, assigns the right designer and writes the follow-up email for you.
            </p>
            <div className="mt-9 flex items-center justify-center gap-3">
              <Button
                size="lg"
                className="rounded-full bg-primary px-7 text-primary-foreground hover:bg-primary/90"
                onClick={() =>
                  document.getElementById("workspace")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Analyze a request
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Workspace */}
        <section id="workspace" className="mx-auto max-w-6xl scroll-mt-20 px-6 pb-24">
          <div className="surface-panel glow-ring overflow-hidden rounded-3xl">
            <div className="flex items-center gap-2 border-b border-border/60 px-5 py-3">
              <span className="size-2.5 rounded-full bg-destructive/70" />
              <span className="size-2.5 rounded-full bg-warning/70" />
              <span className="size-2.5 rounded-full bg-success/70" />
              <span className="ml-3 text-xs text-muted-foreground">briefpilot / intake</span>
            </div>

            <div className="grid gap-0 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
              <div className="border-b border-border/60 p-6 lg:border-b-0 lg:border-r">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                    Client email
                  </h2>
                  <button
                    onClick={() => setEmail(SAMPLE_EMAIL)}
                    className="text-xs text-primary-glow transition-opacity hover:opacity-75"
                  >
                    Use sample
                  </button>
                </div>
                <textarea
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Paste the client email here…"
                  className="mt-4 h-72 w-full resize-none rounded-2xl border border-input bg-background/60 p-4 font-sans text-sm leading-relaxed text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-ring"
                />
                <div className="mt-4 flex items-center gap-3">
                  <Button
                    onClick={analyze}
                    disabled={loading || !email.trim()}
                    className="rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="size-4 animate-spin" /> Analyzing…
                      </>
                    ) : (
                      <>
                        <Sparkles className="size-4" /> Analyze request
                      </>
                    )}
                  </Button>
                  {result && (
                    <Button variant="ghost" onClick={reset} className="rounded-full text-muted-foreground">
                      Clear
                    </Button>
                  )}
                </div>
              </div>

              <div className="p-6">
                {!result ? (
                  <div className="flex h-full min-h-[22rem] flex-col items-center justify-center rounded-2xl border border-dashed border-border px-6 text-center">
                    {error ? (
                      <>
                        <AlertTriangle className="size-6 text-destructive" />
                        <p className="mt-3 max-w-xs text-sm text-destructive">{error}</p>
                      </>
                    ) : (
                      <>
                        <Mail className="size-6 text-muted-foreground" />
                        <p className="mt-3 max-w-xs text-sm text-muted-foreground">
                          Your structured brief, missing-info checklist, designer assignment and
                          follow-up draft will appear here.
                        </p>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-2xl border border-border bg-surface/70 px-4 py-3">
                      <span className="text-sm font-medium">Analysis complete</span>
                      <span className="text-xs text-success">
                        {result.designer_type ?? "Routed"}
                      </span>
                    </div>

                    <div className="rounded-2xl border border-border bg-surface/50 p-4">
                      <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        Client brief
                      </h3>
                      <dl className="mt-3 space-y-2.5 text-sm">
                        {Object.entries(result.required_fields).map(([k, v]) => (
                          <div key={k} className="grid grid-cols-[9rem_1fr] gap-3">
                            <dt className="text-muted-foreground capitalize">
                              {k.replace(/_/g, " ")}
                            </dt>
                            <dd className={v ? "text-foreground" : "text-muted-foreground"}>
                              {v ?? "Not provided"}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-2xl border border-border bg-surface/50 p-4">
                        <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                          <AlertTriangle className="size-3.5 text-warning" /> Missing
                        </h3>
                        <ul className="mt-3 space-y-2 text-sm">
                          {(result.missing_fields ?? []).length === 0 ? (
                            <li className="text-muted-foreground">Nothing missing 🎉</li>
                          ) : (
                            (result.missing_fields ?? []).map((f) => (
                              <li key={f} className="flex items-center gap-2 capitalize">
                                <span className="size-1.5 rounded-full bg-warning" />
                                {f.replace(/_/g, " ")}
                              </li>
                            ))
                          )}
                        </ul>
                      </div>
                      <div className="rounded-2xl border border-border bg-surface/50 p-4">
                        <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                          <UserRound className="size-3.5" /> Assigned
                        </h3>
                        <div className="mt-3 flex items-center gap-3">
                          <span className="grid size-10 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                            {initialsOf(result.assigned_to?.name ?? "Ops")}
                          </span>
                          <div className="text-sm">
                            <p className="font-medium">{result.assigned_to?.name ?? "Operations Team"}</p>
                            <p className="text-muted-foreground">{result.assigned_to?.team ?? "General"}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-border bg-surface/50 p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                          Follow-up draft
                        </h3>
                        <button
                          onClick={copy}
                          className="inline-flex items-center gap-1.5 text-xs text-primary-glow transition-opacity hover:opacity-75"
                        >
                          {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                          {copied ? "Copied" : "Copy"}
                        </button>
                      </div>
                      <pre className="mt-3 whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground/90">
                        {result.follow_up_email}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="mx-auto max-w-6xl px-6 pb-28">
          <h2 className="text-2xl font-semibold">How it works</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.n} className="surface-panel rounded-2xl p-6">
                <span className="font-display text-sm text-primary-glow">{s.n}</span>
                <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-7 text-sm text-muted-foreground">
          <span>BriefPilot</span>
          <span>Creative request intake, automated.</span>
        </div>
      </footer>
    </div>
  );
}
