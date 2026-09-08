import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Founders, Format, Introduction, PageHero, Story } from "@/components/about-parts";

export const Route = createFileRoute("/about/")({
  head: () => ({
    meta: [
      { title: "About — Geometry Mains Olympiad" },
      {
        name: "description",
        content:
          "How the Geometry Mains Olympiad started in November 2024, how the paper is built, and how it is graded.",
      },
      { property: "og:title", content: "About the Geometry Mains Olympiad" },
      {
        property: "og:description",
        content:
          "How the olympiad started in 2024, how the paper is built and how it is graded.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <SiteLayout>
      <PageHero
        title="About the olympiad"
        lead="The Geometry Mains Olympiad is a contest for students who like one subject more than the rest of the syllabus: geometry. No mixed bag of topics, no multiple choice — just problems that reward a good diagram and a better idea."
      />

      <section className="mx-auto max-w-4xl px-5 pt-10">
        <nav className="flex flex-wrap gap-2">
          {[
            ["/about/introduction", "Introduction"],
            ["/about/story", "Our story"],
            ["/about/founders", "Founders"],
            ["/about/format", "The format"],
          ].map(([to, label]) => (
            <Link
              key={to}
              to={to!}
              className="rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground hover:text-chalk"
            >
              {label}
            </Link>
          ))}
        </nav>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-16">
        <h2 id="introduction" className="scroll-mt-24 font-display text-2xl font-semibold text-chalk">
          Introduction
        </h2>
        <Introduction />

        <h2 id="story" className="mt-16 scroll-mt-24 font-display text-2xl font-semibold text-chalk">
          Our story
        </h2>
        <Story />

        <h2 id="founders" className="mt-16 scroll-mt-24 font-display text-2xl font-semibold text-chalk">
          Founders
        </h2>
        <Founders />

        <h2 id="format" className="mt-16 scroll-mt-24 font-display text-2xl font-semibold text-chalk">
          The format
        </h2>
        <Format />
      </section>
    </SiteLayout>
  );
}
