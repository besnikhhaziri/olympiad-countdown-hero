import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, DISCORD_URL } from "@/components/SiteLayout";
import { ApplyForm, MarkingSchemeCard, RolesGrid } from "@/components/contribute-parts";

export const Route = createFileRoute("/contribute/")({
  head: () => ({
    meta: [
      { title: "Contribute & earn a certificate — Geometry Mains Olympiad" },
      {
        name: "description",
        content:
          "Help run the Geometry Mains Olympiad: grade papers, write solutions or moderate the community, and receive a signed certificate of contribution.",
      },
      {
        property: "og:title",
        content: "Contribute & earn a certificate — Geometry Mains Olympiad",
      },
      {
        property: "og:description",
        content: "Grade papers, write solutions, join the team — and get a signed certificate.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contribute,
});

const pill =
  "rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground hover:text-chalk";

function Contribute() {
  return (
    <SiteLayout>
      <section className="grid-paper border-b border-border">
        <div className="mx-auto max-w-4xl px-5 py-20">
          <div className="text-xs uppercase tracking-[0.2em] text-crimson">Volunteer</div>
          <h1 className="mt-3 font-display text-5xl font-bold text-chalk">
            Contribute and get a certificate
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            The olympiad is free because people volunteer. Help us grade papers, write
            official solutions or run the community, and we'll send you a{" "}
            <strong className="text-chalk">signed certificate of contribution</strong>{" "}
            plus a credit on the results page.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-border px-5 py-3 font-display text-xs font-semibold uppercase tracking-[0.14em] text-chalk hover:bg-secondary"
            >
              Join our Discord
            </a>
            <Link
              to="/staff"
              className="rounded-lg border border-border px-5 py-3 font-display text-xs font-semibold uppercase tracking-[0.14em] text-chalk hover:bg-secondary"
            >
              See the team
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 pt-10">
        <nav className="flex flex-wrap gap-2">
          <Link to="/contribute/roles" className={pill}>
            Volunteer roles
          </Link>
          <Link to="/contribute/marking-scheme" className={pill}>
            Marking scheme
          </Link>
          <Link to="/contribute/apply" className={pill}>
            Apply
          </Link>
        </nav>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-14">
        <h2 className="font-display text-2xl font-semibold text-chalk">Open roles</h2>
        <RolesGrid />
      </section>

      <section className="mx-auto max-w-4xl px-5 pb-4">
        <h2 className="mb-4 font-display text-2xl font-semibold text-chalk">Marking scheme</h2>
        <MarkingSchemeCard />
      </section>

      <section className="mx-auto max-w-2xl px-5 py-16 pb-20">
        <h2 className="font-display text-2xl font-semibold text-chalk">Apply</h2>
        <ApplyForm />
      </section>
    </SiteLayout>
  );
}
