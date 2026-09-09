import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/about-parts";
import { RolesGrid } from "@/components/contribute-parts";

export const Route = createFileRoute("/contribute/roles")({
  head: () => ({
    meta: [
      { title: "Volunteer roles — Geometry Mains Olympiad" },
      {
        name: "description",
        content:
          "Every volunteer role at the Geometry Mains Olympiad: grading, marking schemes, solutions, problem committee and community.",
      },
      { property: "og:title", content: "Volunteer roles — Geometry Mains Olympiad" },
      {
        property: "og:description",
        content: "Grading, marking schemes, solutions, problem committee and community.",
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
        title="Volunteer roles"
        lead="Pick the role that fits you best — every one of them earns a signed certificate of contribution."
      />
      <section className="mx-auto max-w-4xl px-5 py-16">
        <RolesGrid />
        <Link to="/contribute/apply" className="mt-10 inline-block text-sm text-crimson underline">
          Apply for a role
        </Link>
      </section>
    </SiteLayout>
  );
}
