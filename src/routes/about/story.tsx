import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero, Story } from "@/components/about-parts";

export const Route = createFileRoute("/about/story")({
  head: () => ({
    meta: [
      { title: "Our story — Geometry Mains Olympiad" },
      {
        name: "description",
        content:
          "From the first edition in November 2024 to the second edition in November 2026.",
      },
      { property: "og:title", content: "Our story — Geometry Mains Olympiad" },
      {
        property: "og:description",
        content: "From the first edition in 2024 to the second edition in 2026.",
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
        eyebrow="About"
        title="Our story"
        lead="How the olympiad started and where it is going."
      />
      <section className="mx-auto max-w-4xl px-5 py-16">
        <Story />
        <Link to="/about" className="mt-10 inline-block text-sm text-crimson underline">
          Back to the full About page
        </Link>
      </section>
    </SiteLayout>
  );
}
