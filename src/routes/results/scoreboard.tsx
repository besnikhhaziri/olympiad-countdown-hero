import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/about-parts";
import { Scoreboard } from "@/components/results-parts";

export const Route = createFileRoute("/results/scoreboard")({
  head: () => ({
    meta: [
      { title: "Full scoreboard — Geometry Mains Olympiad" },
      {
        name: "description",
        content:
          "Every contestant, country and problem score from the 2024 Geometry Mains Olympiad.",
      },
      { property: "og:title", content: "Full scoreboard — Geometry Mains Olympiad" },
      {
        property: "og:description",
        content: "Every contestant, country and problem score from the 2024 olympiad.",
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
        title="Full scoreboard"
        lead="Every contestant, problem by problem. Each problem is marked out of 10."
      />
      <section className="mx-auto max-w-5xl px-5 py-16">
        <Scoreboard />
        <Link to="/results" className="mt-10 inline-block text-sm text-crimson underline">
          Back to the results page
        </Link>
      </section>
    </SiteLayout>
  );
}
