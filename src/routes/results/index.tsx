import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

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

const AWARDS = [
  {
    tier: "Perfect score",
    names: ["Vadym Solomka", "Pryhunov Volody", "TestX01"],
    accent: "bg-crimson text-crimson-foreground",
  },
  { tier: "Gold", names: ["Enzo"], accent: "bg-[oklch(0.82_0.15_85)] text-[oklch(0.25_0.05_85)]" },
  { tier: "Silver", names: ["Angel"], accent: "bg-[oklch(0.86_0.01_240)] text-[oklch(0.3_0.02_240)]" },
  {
    tier: "Bronze",
    names: ["Besnik Haziri", "Arleth", "Ruan", "Riddhiman", "Karlo Jokoš"],
    accent: "bg-[oklch(0.72_0.09_55)] text-[oklch(0.25_0.05_55)]",
  },
  {
    tier: "Honourable mention",
    names: ["Mather", "Taisia", "Ho Janson", "Yudin Yaroslav"],
    accent: "bg-secondary text-secondary-foreground",
  },
];

const SCORES: [string, string, number[], number][] = [
  ["Arleth", "El Salvador", [10, 10, 0, 0, 0, 0], 20],
  ["Besnik Haziri", "Kosovo", [10, 10, 0, 0, 0, 0], 20],
  ["Ruan", "Brazil", [10, 10, 0, 0, 0, 0], 20],
  ["Enzo", "Brazil", [10, 10, 10, 10, 10, 0], 50],
  ["Vadym Solomka", "Ukraine", [10, 10, 10, 10, 10, 10], 60],
  ["Riddhiman", "India", [10, 10, 0, 0, 0, 0], 20],
  ["Taisia", "Russia", [10, 5, 0, 0, 0, 0], 15],
  ["Yudin Yaroslav", "Ukraine", [0, 10, 0, 0, 0, 0], 10],
  ["Mather", "Libya", [0, 0, 0, 0, 0, 10], 10],
  ["Pryhunov Volody", "Ukraine", [10, 10, 10, 10, 10, 10], 60],
  ["Karlo Jokoš", "Croatia", [10, 10, 0, 0, 0, 0], 20],
  ["Ho Janson", "Malaysia", [10, 0, 0, 0, 0, 0], 10],
  ["Angel", "Cyprus", [10, 10, 10, 0, 0, 10], 40],
  ["TestX01", "Australia", [10, 10, 10, 10, 10, 10], 57],
];

function Results() {
  const sorted = [...SCORES].sort((a, b) => b[3] - a[3]);

  return (
    <SiteLayout>
      <section className="grid-paper border-b border-border">
        <div className="mx-auto max-w-5xl px-5 py-20">
          <div className="text-xs uppercase tracking-[0.2em] text-crimson">
            Edition I · November 2024
          </div>
          <h1 className="mt-3 font-display text-5xl font-bold text-chalk">
            Results
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            Students from around the world sat the very first Geometry Mains
            Olympiad. Thanks for participating — here is how it finished.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              ["3", "Perfect scores"],
              ["1", "Gold"],
            ].map(([k, v]) => (

              <div key={v} className="rounded-xl border border-border bg-card p-5">
                <div className="font-display text-3xl font-bold text-crimson">
                  {k}
                </div>
                <div className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  {v}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl space-y-4 px-5 py-16">
        <h2 className="font-display text-2xl font-semibold text-chalk">
          Awards
        </h2>
        {AWARDS.map((a) => (
          <div
            key={a.tier}
            className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 sm:flex-row sm:items-center"
          >
            <span
              className={`w-fit rounded-full px-4 py-1.5 font-display text-xs font-bold uppercase tracking-[0.16em] ${a.accent}`}
            >
              {a.tier}
            </span>
            <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm font-medium text-chalk">
              {a.names.map((n) => (
                <span key={n}>{n}</span>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-20">
        <h2
          id="scoreboard"
          className="scroll-mt-24 font-display text-2xl font-semibold text-chalk"
        >
          Full scoreboard
        </h2>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-[0.14em] text-muted-foreground">
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Country</th>
                {[1, 2, 3, 4, 5, 6].map((p) => (
                  <th key={p} className="px-3 py-3 text-center font-semibold">
                    P{p}
                  </th>
                ))}
                <th className="px-4 py-3 text-right font-semibold">Total</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map(([name, country, ps, total]) => (
                <tr key={name} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 font-medium text-chalk">{name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{country}</td>
                  {ps.map((p, i) => (
                    <td
                      key={i}
                      className={`px-3 py-3 text-center tabular-nums ${
                        p === 0 ? "text-muted-foreground/50" : "text-chalk"
                      }`}
                    >
                      {p}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right font-display font-bold tabular-nums text-crimson">
                    {total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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
