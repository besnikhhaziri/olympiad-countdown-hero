import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/about-parts";
import { MarkingSchemeCard } from "@/components/contribute-parts";

export const Route = createFileRoute("/contribute/marking-scheme")({
  head: () => ({
    meta: [
      { title: "Marking scheme — Geometry Mains Olympiad" },
      {
        name: "description",
        content:
          "How papers are graded at the Geometry Mains Olympiad: 10 points per problem against a written marking scheme published with the solutions.",
      },
      { property: "og:title", content: "Marking scheme — Geometry Mains Olympiad" },
      {
        property: "og:description",
        content: "How partial credit works and how you can help write the scheme.",
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
        eyebrow="Contribute"
        title="Marking scheme"
        lead="Every problem is graded out of 10 against a scheme agreed before grading starts, so partial credit is applied the same way for everyone."
      />
      <section className="mx-auto max-w-4xl px-5 py-16">
        <MarkingSchemeCard />
        <Link to="/contribute/apply" className="mt-10 inline-block text-sm text-crimson underline">
          Apply to help write it
        </Link>
      </section>
    </SiteLayout>
  );
}
