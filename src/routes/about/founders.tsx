import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Founders, PageHero } from "@/components/about-parts";

export const Route = createFileRoute("/about/founders")({
  head: () => ({
    meta: [
      { title: "Founders — Geometry Mains Olympiad" },
      {
        name: "description",
        content: "The team that founded the Geometry Mains Olympiad in 2024.",
      },
      { property: "og:title", content: "Founders — Geometry Mains Olympiad" },
      {
        property: "og:description",
        content: "The team that founded the Geometry Mains Olympiad in 2024.",
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
      <PageHero eyebrow="About" title="Founders" lead="Who started the olympiad." />
      <section className="mx-auto max-w-4xl px-5 py-16">
        <Founders />
        <Link to="/about" className="mt-10 inline-block text-sm text-crimson underline">
          Back to the full About page
        </Link>
      </section>
    </SiteLayout>
  );
}
