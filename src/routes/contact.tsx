import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, NEW_EMAIL, OLD_EMAIL, DISCORD_URL } from "@/components/SiteLayout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact us — Geometry Mains Olympiad" },
      {
        name: "description",
        content:
          "Get in touch with the Geometry Mains Olympiad team by email or on our Discord server.",
      },
      { property: "og:title", content: "Contact the Geometry Mains Olympiad" },
      {
        property: "og:description",
        content: "Reach the organisers by email or join the Discord server.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <SiteLayout>
      <section className="grid-paper border-b border-border">
        <div className="mx-auto max-w-4xl px-5 py-20">
          <div className="text-xs uppercase tracking-[0.2em] text-crimson">
            Say hello
          </div>
          <h1 className="mt-3 font-display text-5xl font-bold text-chalk">
            Contact us
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Questions about the contest, the paper, grading or partnering with
            us? Write to us — we read everything and usually reply within a few
            days.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-4xl gap-5 px-5 py-16 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-8">
          <h2 className="font-display text-xl font-semibold text-chalk">
            Email
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Main address —{" "}
            <a href={`mailto:${NEW_EMAIL}`} className="text-crimson underline">
              {NEW_EMAIL}
            </a>
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Old address, still monitored —{" "}
            <a href={`mailto:${OLD_EMAIL}`} className="hover:text-chalk">
              {OLD_EMAIL}
            </a>
          </p>
          <a
            href={`mailto:${NEW_EMAIL}`}
            className="mt-6 inline-block rounded-lg bg-crimson px-5 py-3 font-display text-xs font-semibold uppercase tracking-[0.14em] text-crimson-foreground"
          >
            Write to us
          </a>
        </div>

        <div className="rounded-2xl border border-border bg-card p-8">
          <h2 className="font-display text-xl font-semibold text-chalk">
            Discord
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            The fastest way to reach the team and other contestants:
            announcements, study partners and problem discussion.
          </p>
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-block rounded-lg border border-crimson px-5 py-3 font-display text-xs font-semibold uppercase tracking-[0.14em] text-crimson"
          >
            Join the server
          </a>
        </div>
      </section>
    </SiteLayout>
  );
}
