import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/about-parts";
import { AwardsList } from "@/components/results-parts";

export const Route = createFileRoute("/results/2024")({
  head: () => ({
    meta: [
      { title: "1st competition 2024 — Results — Geometry Mains Olympiad" },
      {
        name: "description",
        content:
          "Awards from the first Geometry Mains Olympiad, November 2024: perfect scores, gold, silver, bronze and honourable mentions.",
      },
      { property: "og:title", content: "1st competition 2024 — Results" },
      {
        property: "og:description",
        content: "Awards from the first Geometry Mains Olympiad, November 2024.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Edition I · November 2024"
        title="1st competition — 2024"
        lead="The awards from our very first olympiad."
      />
      <section className="mx-auto max-w-5xl px-5 py-16">
        <AwardsList />
        <div className="mt-10 flex flex-wrap gap-4 text-sm">
          <Link to="/results/scoreboard" className="text-crimson underline">
            See the full scoreboard
          </Link>
          <Link to="/past-papers/2024" className="text-crimson underline">
            Download the 2024 paper
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
