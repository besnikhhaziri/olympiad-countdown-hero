import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/about")({
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

const TIMELINE = [
  {
    year: "November 2024",
    title: "The first edition",
    body: "We ran the very first Geometry Mains Olympiad — a single paper of synthetic geometry problems, written and graded by hand.",
  },
  {
    year: "2025",
    title: "A year off",
    body: "We spent the year collecting problem proposals, rewriting the grading scheme and figuring out how to run the contest at a larger scale.",
  },
  {
    year: "November 2026",
    title: "The second edition",
    body: "The olympiad returns on November 14. Same spirit, more seats, and published solutions for every problem afterwards.",
  },
];

function About() {
  return (
    <SiteLayout>
      <section className="grid-paper border-b border-border">
        <div className="mx-auto max-w-4xl px-5 py-20">
          <h1 className="font-display text-5xl font-bold text-chalk">
            About the olympiad
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            The Geometry Mains Olympiad is a contest for students who like one
            subject more than the rest of the syllabus: geometry. No mixed bag of
            topics, no multiple choice — just problems that reward a good
            diagram and a better idea.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 pt-10">
        <nav className="flex flex-wrap gap-2">
          {[
            ["#introduction", "Introduction"],
            ["#story", "Our story"],
            ["#founders", "Founders"],
            ["#format", "The format"],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground hover:text-chalk"
            >
              {label}
            </a>
          ))}
        </nav>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-16">
        <h2 id="introduction" className="font-display text-2xl font-semibold text-chalk">
          Introduction
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          The olympiad is run by a small volunteer team of students and former
          contestants. Everything — the paper, the grading, the website — is
          made by people who simply enjoy geometry, and entry is always free.
        </p>

        <h2 id="story" className="mt-16 className="font-display text-2xl font-semibold text-chalk">
          Our story
        </h2>
        <ol className="mt-8 space-y-8 border-l border-border pl-6">
          {TIMELINE.map((t) => (
            <li key={t.year} className="relative">
              <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-crimson" />
              <div className="text-xs uppercase tracking-[0.2em] text-crimson">
                {t.year}
              </div>
              <h3 className="mt-1 font-display text-xl font-semibold text-chalk">
                {t.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {t.body}
              </p>
            </li>
          ))}
        </ol>

        <h2 id="founders" className="mt-16 font-display text-2xl font-semibold text-chalk">
          Founders
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          The olympiad was founded in 2024 by a group of secondary-school
          geometry enthusiasts who wanted a contest devoted to one subject only.
          The founding team still writes and grades the paper today.
        </p>

        <h2 id="format" className="mt-16 font-display text-2xl font-semibold text-chalk">
          The format
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            ["Full written proofs", "Answers alone score nothing — argue it."],
            ["No calculators", "Straightedge and compass thinking only."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-display text-lg font-semibold text-chalk">
                {t}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
