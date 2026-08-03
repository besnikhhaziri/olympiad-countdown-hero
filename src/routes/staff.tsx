import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, NEW_EMAIL, DISCORD_URL } from "@/components/SiteLayout";

export const Route = createFileRoute("/staff")({
  head: () => ({
    meta: [
      { title: "Staff — Geometry Mains Olympiad" },
      {
        name: "description",
        content:
          "Meet the organisers, problem selection committee and graders behind the Geometry Mains Olympiad, and see how to join the team.",
      },
      { property: "og:title", content: "Staff — Geometry Mains Olympiad" },
      {
        property: "og:description",
        content: "The organisers, problem committee and graders of the olympiad.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Staff,
});

const TEAM = [
  {
    role: "Founder & director",
    name: "To be listed",
    bio: "Runs the olympiad, writes the announcements and keeps the paper on schedule.",
  },
  {
    role: "Problem selection committee",
    name: "Open — 3 seats",
    bio: "Reads every proposal, tests difficulty and builds the four-problem paper.",
  },
  {
    role: "Head of grading",
    name: "Open",
    bio: "Writes the marking scheme and coordinates graders across time zones.",
  },
  {
    role: "Graders",
    name: "Open — several seats",
    bio: "Mark scripts against the scheme. Every grader receives a signed certificate.",
  },
  {
    role: "Community & Discord moderation",
    name: "Open",
    bio: "Keeps the server useful: weekly problems, study threads, announcements.",
  },
  {
    role: "Web & design",
    name: "Open",
    bio: "Keeps this site, the paper typesetting and the certificates looking sharp.",
  },
];

function Staff() {
  return (
    <SiteLayout>
      <section className="grid-paper border-b border-border">
        <div className="mx-auto max-w-5xl px-5 py-20">
          <div className="text-xs uppercase tracking-[0.2em] text-crimson">The team</div>
          <h1 className="mt-3 font-display text-5xl font-bold text-chalk">Staff</h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            The olympiad is run by volunteers. Several seats are open for the 2026
            edition — if one of them sounds like you, apply on the{" "}
            <a href="/contribute" className="text-crimson underline">
              contribute page
            </a>
            .
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-16">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((m) => (
            <article key={m.role} className="rounded-2xl border border-border bg-card p-6">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-crimson">
                {m.role}
              </div>
              <h2 className="mt-2 font-display text-lg font-semibold text-chalk">
                {m.name}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.bio}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-crimson bg-card p-8">
          <h2 className="font-display text-2xl font-semibold text-chalk">
            Want your name on this page?
          </h2>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Tell us what you'd like to do and what you've done in geometry so far. Write
            to{" "}
            <a href={`mailto:${NEW_EMAIL}`} className="text-crimson underline">
              {NEW_EMAIL}
            </a>{" "}
            or say hello on{" "}
            <a href={DISCORD_URL} target="_blank" rel="noreferrer" className="text-crimson underline">
              Discord
            </a>
            .
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
