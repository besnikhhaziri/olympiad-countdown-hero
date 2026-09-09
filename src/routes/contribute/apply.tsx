import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/about-parts";
import { ApplyForm } from "@/components/contribute-parts";

export const Route = createFileRoute("/contribute/apply")({
  head: () => ({
    meta: [
      { title: "Apply to contribute — Geometry Mains Olympiad" },
      {
        name: "description",
        content:
          "Apply to volunteer for the Geometry Mains Olympiad: grade papers, write marking schemes or solutions, and receive a signed certificate.",
      },
      { property: "og:title", content: "Apply to contribute — Geometry Mains Olympiad" },
      {
        property: "og:description",
        content: "Send a short essay about your background and the role you want.",
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
        title="Apply"
        lead="Tell us what you've done in geometry so far and why you want the role. You can apply for more than one role at once."
      />
      <section className="mx-auto max-w-2xl px-5 py-16">
        <ApplyForm />
        <Link to="/contribute/roles" className="mt-10 inline-block text-sm text-crimson underline">
          See all volunteer roles
        </Link>
      </section>
    </SiteLayout>
  );
}
