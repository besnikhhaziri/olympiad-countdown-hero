import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/about-parts";
import { PAPERS, PaperCard } from "@/components/papers";

export const Route = createFileRoute("/past-papers/2024")({
  head: () => ({
    meta: [
      { title: "1st paper 2024 — Geometry Mains Olympiad" },
      {
        name: "description",
        content:
          "Download the 2024 Geometry Mains Olympiad paper and read how it is marked.",
      },
      { property: "og:title", content: "1st paper 2024 — Geometry Mains Olympiad" },
      {
        property: "og:description",
        content: "Download the 2024 paper and read how it is marked.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  const paper = PAPERS.find((p) => p.id === "2024")!;
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Past papers"
        title="1st paper — 2024"
        lead="The paper from our first edition, free to download."
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
