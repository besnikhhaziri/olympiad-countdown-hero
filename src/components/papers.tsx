import { Link } from "@tanstack/react-router";

export type Paper = {
  id: string;
  label: string;
  title: string;
  date: string;
  blurb: string;
  file: string | null;
  scheme: string | null;
};

export const PAPERS: Paper[] = [
  {
    id: "2024",
    label: "1st paper",
    title: "Geometry Mains Olympiad 2024",
    date: "November 2024",
    blurb:
      "The original paper from our first edition — pure synthetic geometry, written and graded by hand.",
    file: "/gmo-2024.pdf",
    scheme: null,
  },
  {
    id: "2026",
    label: "2nd paper",
    title: "Geometry Mains Olympiad 2026",
    date: "November 2026",
    blurb: "Published here the moment the contest ends, together with full solutions.",
    file: null,
    scheme: null,
  },
];

export function PaperCard({ paper }: { paper: Paper }) {
  return (
    <article className="rounded-2xl border border-border bg-card p-8 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-crimson">
            {paper.label} · {paper.date}
          </div>
          <h2 className="mt-2 font-display text-2xl font-semibold text-chalk">
            {paper.title}
          </h2>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">{paper.blurb}</p>
          {paper.id === "2024" && (
            <Link to="/results" className="mt-3 inline-block text-sm text-crimson underline">
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

      <div className="mt-6 rounded-xl border border-border p-5">
        <h3 className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-chalk">
          Marking scheme
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Every problem is marked out of 10 against a written marking scheme, so
          partial credit is applied the same way for everyone.{" "}
          {paper.scheme ? "Download it below." : "The scheme for this edition is being written and will be published here."}
        </p>
        {paper.scheme && (
          <a
            href={paper.scheme}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm text-crimson underline"
          >
            Download the marking scheme
          </a>
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
  );
}
