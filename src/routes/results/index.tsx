import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { AwardsList, Scoreboard } from "@/components/results-parts";

export const Route = createFileRoute("/results/")({
  head: () => ({
    meta: [
      { title: "Results 2024 — Geometry Mains Olympiad" },
      {
        name: "description",
        content:
          "Full results of the first Geometry Mains Olympiad, November 2024: perfect scores, gold, silver, bronze and honourable mentions.",
      },
      { property: "og:title", content: "Geometry Mains Olympiad 2024 Results" },
      {
        property: "og:description",
        content:
          "Perfect scores, medals and honourable mentions from the first edition of the olympiad.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Results,
});

const pill =
  "rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground hover:text-chalk";

function Results() {
  return (
    <SiteLayout>
      <section className="grid-paper border-b border-border">
        <div className="mx-auto max-w-5xl px-5 py-20">
          <div className="text-xs uppercase tracking-[0.2em] text-crimson">
            Edition I · November 2024
          </div>
          <h1 className="mt-3 font-display text-5xl font-bold text-chalk">Results</h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            Students from around the world sat the very first Geometry Mains
            Olympiad. Thanks for participating — here is how it finished.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            <Link to="/results/2024" className={pill}>
              1st competition — 2024
            </Link>
            <Link to="/results/scoreboard" className={pill}>
              Full scoreboard
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-16">
        <h2 className="font-display text-2xl font-semibold text-chalk">Awards</h2>
        <div className="mt-4">
          <AwardsList />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-20">
        <h2
          id="scoreboard"
          className="scroll-mt-24 font-display text-2xl font-semibold text-chalk"
        >
          Full scoreboard
        </h2>
        <Scoreboard />
        <p className="mt-8 text-sm text-muted-foreground">
          Want to try the paper yourself?{" "}
          <Link to="/past-papers" className="text-crimson underline">
            Download the 2024 paper
          </Link>
          .
        </p>
      </section>
    </SiteLayout>
  );
}
