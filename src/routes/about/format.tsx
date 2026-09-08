import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Format, PageHero } from "@/components/about-parts";

export const Route = createFileRoute("/about/format")({
  head: () => ({
    meta: [
      { title: "The format — Geometry Mains Olympiad" },
      {
        name: "description",
        content: "How the Geometry Mains Olympiad paper works: full written proofs, no calculators.",
      },
      { property: "og:title", content: "The format — Geometry Mains Olympiad" },
      {
        property: "og:description",
        content: "Full written proofs, no calculators — how the paper works.",
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
      <PageHero eyebrow="About" title="The format" lead="What sitting the paper looks like." />
      <section className="mx-auto max-w-4xl px-5 py-16">
        <Format />
        <Link to="/about" className="mt-10 inline-block text-sm text-crimson underline">
          Back to the full About page
        </Link>
      </section>
    </SiteLayout>
  );
}
