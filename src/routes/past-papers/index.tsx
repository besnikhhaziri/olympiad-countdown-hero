import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PAPERS, PaperCard } from "@/components/papers";

export const Route = createFileRoute("/past-papers/")({
  head: () => ({
    meta: [
      { title: "Past Papers — Geometry Mains Olympiad" },
      {
        name: "description",
        content:
          "Browse and download every Geometry Mains Olympiad paper and marking scheme, one edition at a time.",
      },
      { property: "og:title", content: "Past Papers — Geometry Mains Olympiad" },
      {
        property: "og:description",
        content: "Browse and download every Geometry Mains Olympiad paper and marking scheme.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PastPapers,
});

const pill =
  "rounded-full border border-border px-5 py-2 font-display text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground hover:text-chalk";

function PastPapers() {
  return (
    <SiteLayout>
      <section className="grid-paper border-b border-border">
        <div className="mx-auto max-w-4xl px-5 py-20">
          <h1 className="font-display text-5xl font-bold text-chalk">Past papers</h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Everything we've ever set, free to download, together with the marking
            schemes so you can see exactly how each problem is graded.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            <Link to="/past-papers/2024" className={pill}>
              1st paper · 2024
            </Link>
            <Link to="/past-papers/2026" className={pill}>
              2nd paper · 2026
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl space-y-10 px-5 py-16">
        {PAPERS.map((p) => (
          <PaperCard key={p.id} paper={p} />
        ))}
      </section>
    </SiteLayout>
  );
}
