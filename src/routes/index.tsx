import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Countdown } from "@/components/Countdown";
import logo from "@/assets/gmo-logo.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Geometry Mains Olympiad 2026 — Second Edition" },
      {
        name: "description",
        content:
          "The Geometry Mains Olympiad returns this November. Pure synthetic geometry, open to everyone. Countdown, past papers and registration.",
      },
      { property: "og:title", content: "Geometry Mains Olympiad 2026" },
      {
        property: "og:description",
        content:
          "The Geometry Mains Olympiad returns this November — pure synthetic geometry, open to everyone.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const FACTS = [
  { k: "Free", v: "Entry" },
  { k: "2nd", v: "Edition" },
];





function Home() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden grid-paper">
        <div className="pointer-events-none absolute inset-0 hero-glow" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:py-28">
          <div>
            <span className="inline-block rounded-full border border-crimson px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-chalk">
              November 14, 2026
            </span>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] text-chalk sm:text-6xl">
              Geometry Mains
              <br />
              Olympiad
            </h1>
            <p className="mt-5 max-w-md text-lg text-muted-foreground">
              Two years after our first paper, the olympiad is back. One sitting,
              a paper of pure geometry, and nothing but circles, triangles and the ideas that
              tie them together.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/register"
                className="rounded-lg bg-crimson px-6 py-3 font-display text-sm font-semibold uppercase tracking-wide text-crimson-foreground transition-transform hover:-translate-y-0.5"
              >
                Register interest
              </Link>
              <Link
                to="/past-papers"
                className="rounded-lg border border-border px-6 py-3 font-display text-sm font-semibold uppercase tracking-wide text-chalk transition-colors hover:bg-secondary"
              >
                View 2024 paper
              </Link>
              <Link
                to="/results"
                className="rounded-lg border border-border px-6 py-3 font-display text-sm font-semibold uppercase tracking-wide text-chalk transition-colors hover:bg-secondary"
              >
                2024 results
              </Link>

            </div>
          </div>

          <div className="flex justify-center">
            <img
              src={logo}
              alt="Geometry Mains Olympiad emblem"
              className="w-64 animate-float rounded-full sm:w-80"
              style={{ boxShadow: "var(--shadow-glow)" }}
            />
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card/40">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <h2 className="text-center font-display text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Contest begins in
          </h2>
          <div className="mx-auto mt-6 max-w-3xl">
            <Countdown />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FACTS.map((f) => (
            <div
              key={f.v}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="font-display text-4xl font-bold text-crimson">
                {f.k}
              </div>
              <div className="mt-1 text-sm uppercase tracking-[0.16em] text-muted-foreground">
                {f.v}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {[
            {
              t: "Purely synthetic",
              d: "Problems are written so that a clean diagram and a good idea beat heavy computation every time.",
            },
            {
              t: "Open to everyone",
              d: "Any secondary school student can sit the paper. No qualification round, no fee.",
            },
            {
              t: "Full solutions published",
              d: "Every problem gets a written solution after the contest, so the paper is worth studying afterwards.",
            },
          ].map((c) => (
            <article key={c.t} className="rounded-xl border border-border p-6">
              <h3 className="font-display text-xl font-semibold text-chalk">
                {c.t}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {c.d}
              </p>
            </article>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
