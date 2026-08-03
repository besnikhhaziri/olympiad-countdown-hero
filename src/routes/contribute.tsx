import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { SiteLayout, NEW_EMAIL, DISCORD_URL } from "@/components/SiteLayout";
import { useAuth } from "@/lib/auth";
import { COUNTRIES } from "@/lib/countries";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/contribute")({
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

const ROLES = [
  {
    id: "grader",
    title: "Grader",
    body: "Mark scripts against our marking scheme during the week after the contest. Roughly 5-8 hours of work.",
  },
  {
    id: "solution-writer",
    title: "Solution writer",
    body: "Write up clean, readable official solutions for one of the four problems.",
  },
  {
    id: "problem-committee",
    title: "Problem committee",
    body: "Test-solve proposals, judge difficulty and help shape the final paper.",
  },
  {
    id: "community",
    title: "Community & moderation",
    body: "Run weekly problems and keep the Discord server useful and welcoming.",
  },
];

function Contribute() {
  const { user, profile } = useAuth();
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!user) return;
    const f = new FormData(e.currentTarget);
    setBusy(true);
    const { error } = await supabase.from("contributor_applications").insert({
      user_id: user.id,
      full_name: String(f.get("full_name") ?? "").trim().slice(0, 120),
      country: String(f.get("country") ?? ""),
      role_wanted: String(f.get("role_wanted") ?? "grader"),
      essay: String(f.get("essay") ?? "").trim().slice(0, 8000),
    });
    setBusy(false);
    if (error) toast.error(error.message);
    else {
      setSent(true);
      toast.success("Application sent — thank you!");
    }
  }

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

      <section className="mx-auto max-w-4xl px-5 py-14">
        <h2 className="font-display text-2xl font-semibold text-chalk">Open roles</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {ROLES.map((r) => (
            <article key={r.id} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-display text-lg font-semibold text-chalk">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-5 pb-20">
        <h2 className="font-display text-2xl font-semibold text-chalk">Apply</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Tell us in a short essay what you've achieved in geometry or maths so far —
          contests, results, teaching, writing, anything relevant — and why you want this
          role.
        </p>

        {!user ? (
          <div className="mt-6 rounded-2xl border border-border bg-card p-8 text-center">
            <p className="text-sm text-muted-foreground">
              Sign in so we can attach your application (and your certificate) to your
              account.
            </p>
            <Link
              to="/auth"
              className="mt-5 inline-block rounded-lg bg-crimson px-6 py-3 font-display text-xs font-semibold uppercase tracking-[0.14em] text-crimson-foreground"
            >
              Sign in or create an account
            </Link>
            <p className="mt-4 text-xs text-muted-foreground">
              Or email{" "}
              <a href={`mailto:${NEW_EMAIL}`} className="text-crimson underline">
                {NEW_EMAIL}
              </a>
              .
            </p>
          </div>
        ) : sent ? (
          <div className="mt-6 rounded-2xl border border-crimson bg-card p-8 text-center">
            <h3 className="font-display text-xl font-semibold text-chalk">
              Application received
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              We'll reply by email before grading season. Thank you for helping.
            </p>
          </div>
        ) : (
          <form
            onSubmit={submit}
            className="mt-6 space-y-5 rounded-2xl border border-border bg-card p-8"
          >
            <div>
              <L htmlFor="full_name">Full name</L>
              <input
                id="full_name"
                name="full_name"
                required
                maxLength={120}
                defaultValue={profile?.display_name ?? ""}
                className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-chalk outline-none focus:border-crimson"
              />
            </div>
            <div>
              <L htmlFor="country">Country</L>
              <select
                id="country"
                name="country"
                defaultValue={profile?.country ?? ""}
                className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-chalk outline-none focus:border-crimson"
              >
                <option value="">Select your country</option>
                {COUNTRIES.map((c) => (
                  <option key={c.code} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <L htmlFor="role_wanted">Role</L>
              <select
                id="role_wanted"
                name="role_wanted"
                className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-chalk outline-none focus:border-crimson"
              >
                {ROLES.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <L htmlFor="essay">Your achievements & motivation</L>
              <textarea
                id="essay"
                name="essay"
                required
                rows={8}
                maxLength={8000}
                placeholder="Contests you've taken part in, results, geometry you love, teaching or writing experience…"
                className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-chalk outline-none focus:border-crimson"
              />
            </div>
            <button
              disabled={busy}
              className="w-full rounded-lg bg-crimson px-6 py-3 font-display text-sm font-semibold uppercase tracking-wide text-crimson-foreground disabled:opacity-60"
            >
              {busy ? "Sending…" : "Send application"}
            </button>
          </form>
        )}
      </section>
    </SiteLayout>
  );
}

function L({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground"
    >
      {children}
    </label>
  );
}
