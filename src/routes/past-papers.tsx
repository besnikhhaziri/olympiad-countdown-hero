import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import paper2024 from "@/assets/gmo-2024.pdf.asset.json";

export const Route = createFileRoute("/past-papers")({
  head: () => ({
    meta: [
      { title: "Past Papers — Geometry Mains Olympiad" },
      {
        name: "description",
        content:
          "Download the Geometry Mains Olympiad 2024 paper — the full four-problem contest from our first edition.",
      },
      { property: "og:title", content: "Past Papers — Geometry Mains Olympiad" },
      {
        property: "og:description",
        content: "Download the full 2024 Geometry Mains Olympiad paper.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PastPapers,
});

function PastPapers() {
  return (
    <SiteLayout>
      <section className="grid-paper border-b border-border">
        <div className="mx-auto max-w-4xl px-5 py-20">
          <h1 className="font-display text-5xl font-bold text-chalk">
            Past papers
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Everything we've ever set, free to download. The best preparation for
            this year's paper is last year's paper.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl space-y-6 px-5 py-16">
        <article className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-crimson">
                Edition I · November 2024 · 14 participants
              </div>
              <h2 className="mt-2 font-display text-2xl font-semibold text-chalk">
                Geometry Mains Olympiad 2024
              </h2>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                The original paper, sat by 14 students from 12 countries. PDF,
                166 KB.
              </p>
              <Link
                to="/results"
                className="mt-3 inline-block text-sm text-crimson underline"
              >
                See the 2024 results
              </Link>
            </div>
            <a
              href={paper2024.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-crimson px-6 py-3 font-display text-sm font-semibold uppercase tracking-wide text-crimson-foreground transition-transform hover:-translate-y-0.5"
            >
              Download the paper
            </a>
          </div>
        </article>


        <article className="rounded-2xl border border-dashed border-border p-8 opacity-70">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Edition II · November 2026
          </div>
          <h2 className="mt-2 font-display text-2xl font-semibold text-chalk">
            Geometry Mains Olympiad 2026
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Released here the moment the contest ends, together with full
            solutions.
          </p>
        </article>
      </section>
    </SiteLayout>
  );
}
