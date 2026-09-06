import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/past-papers")({
  head: () => ({
    meta: [
      { title: "Past Papers — Geometry Mains Olympiad" },
      {
        name: "description",
        content:
          "Browse and download every Geometry Mains Olympiad paper, one edition at a time.",
      },
      { property: "og:title", content: "Past Papers — Geometry Mains Olympiad" },
      {
        property: "og:description",
        content: "Browse and download every Geometry Mains Olympiad paper.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PastPapers;
});

type Paper = {
  id: string;
  label: string;
  title: string;
  date: string;
  blurb: string;
  file: string | null;
};

const PAPERS: Paper[] = [
  {
    id: "2024",
    label: "1st paper",
    title: "Geometry Mains Olympiad 2024",
    date: "November 2024",
    blurb:
      "The original paper from our first edition — pure synthetic geometry, written and graded by hand.",
    file: "/gmo-2024.pdf",
  },
  {
    id: "2026",
    label: "2nd paper",
    title: "Geometry Mains Olympiad 2026",
    date: "November 2026",
    blurb:
      "Published here the moment the contest ends, together with full solutions.",
    file: null,
  },
];

function PastPapers() {
  const [selected, setSelected] = useState(PAPERS[0].id);
  const paper = PAPERS.find((p) => p.id === selected) ?? PAPERS[0];

  return (
    <SiteLayout>
      <section className="grid-paper border-b border-border">
        <div className="mx-auto max-w-4xl px-5 py-20">
          <h1 className="font-display text-5xl font-bold text-chalk">
            Past papers
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Everything we've ever set, free to download. Pick an edition below
            to see just that paper — the best preparation for this year's paper
            is last year's paper.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-16">
        <div className="flex flex-wrap gap-2">
          {PAPERS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setSelected(p.id)}
              className={
                "rounded-full border px-5 py-2 font-display text-xs font-semibold uppercase tracking-[0.14em] transition-colors " +
                (p.id === selected
                  ? "border-crimson bg-crimson text-crimson-foreground"
                  : "border-border text-muted-foreground hover:text-chalk")
              }
            >
              {p.label} · {p.id}
            </button>
          ))}
        </div>

        <article className="mt-8 rounded-2xl border border-border bg-card p-8 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-crimson">
                {paper.label} · {paper.date}
              </div>
              <h2 className="mt-2 font-display text-2xl font-semibold text-chalk">
                {paper.title}
              </h2>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                {paper.blurb}
              </p>
              {paper.id === "2024" && (
                <Link
                  to="/results"
                  className="mt-3 inline-block text-sm text-crimson underline"
                >
                  See the 2024 results
                </Link>
              )}
            </div>
            {paper.file ? (
              <a
                href={paper.file}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-crimson px-6 py-3 font-display text-sm font-semibold uppercase tracking-wide text-crimson-foreground transition-transform hover:-translate-y-0.5"
              >
                Download the paper
              </a>
            ) : (
              <span className="rounded-lg border border-dashed border-border px-6 py-3 font-display text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Coming soon
              </span>
            )}
          </div>

          {paper.file && (
            <object
              data={paper.file}
              type="application/pdf"
              className="mt-8 h-[70vh] w-full rounded-xl border border-border"
            >
              <p className="p-4 text-sm text-muted-foreground">
                Your browser can't show the PDF here —{" "}
                <a href={paper.file} className="text-crimson underline">
                  open it in a new tab
                </a>
                .
              </p>
            </object>
          )}
        </article>
      </section>
    </SiteLayout>
  );
}
