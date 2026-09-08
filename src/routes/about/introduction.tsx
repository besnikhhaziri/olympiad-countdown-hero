import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Introduction, PageHero } from "@/components/about-parts";

export const Route = createFileRoute("/about/introduction")({
  head: () => ({
    meta: [
      { title: "Introduction — Geometry Mains Olympiad" },
      {
        name: "description",
        content: "Who runs the Geometry Mains Olympiad and why entry is always free.",
      },
      { property: "og:title", content: "Introduction — Geometry Mains Olympiad" },
      {
        property: "og:description",
        content: "Who runs the Geometry Mains Olympiad and why entry is always free.",
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
        title="Introduction"
        lead="A contest devoted to one subject only — geometry."
      />
      <section className="mx-auto max-w-4xl px-5 py-16">
        <Introduction />
        <Link to="/about" className="mt-10 inline-block text-sm text-crimson underline">
          Back to the full About page
        </Link>
      </section>
    </SiteLayout>
  );
}
