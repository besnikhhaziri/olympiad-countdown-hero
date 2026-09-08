import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/about-parts";
import { PAPERS, PaperCard } from "@/components/papers";

export const Route = createFileRoute("/past-papers/2026")({
  head: () => ({
    meta: [
      { title: "2nd paper 2026 — Geometry Mains Olympiad" },
      {
        name: "description",
        content:
          "The 2026 Geometry Mains Olympiad paper, solutions and marking scheme will be published here after the contest.",
      },
      { property: "og:title", content: "2nd paper 2026 — Geometry Mains Olympiad" },
      {
        property: "og:description",
        content: "Paper, solutions and marking scheme published right after the contest.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  const paper = PAPERS.find((p) => p.id === "2026")!;
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Past papers"
        title="2nd paper — 2026"
        lead="Published here the moment the contest ends, with solutions and the marking scheme."
      />
      <section className="mx-auto max-w-4xl px-5 py-16">
        <PaperCard paper={paper} />
        <Link to="/past-papers" className="mt-10 inline-block text-sm text-crimson underline">
          See all past papers
        </Link>
      </section>
    </SiteLayout>
  );
}
