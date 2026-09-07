import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { SiteLayout, NEW_EMAIL, DISCORD_URL } from "@/components/SiteLayout";
import { CountrySelect } from "@/components/CountrySelect";
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
    id: "volunteer",
    title: "Volunteer",
    body: "General help wherever it's needed: outreach, translations, proofreading and contest-day support.",
  },
  {
    id: "grader",
    title: "Grader",
    body: "Mark scripts against our marking scheme during the week after the contest. Roughly 5-8 hours of work.",
  },
  {
    id: "marking-scheme",
    title: "Marking scheme",
    body: "Help write the marking scheme: point splits, partial credit rules and worked-out grading notes.",
  },
  {
    id: "solution-writer",
    title: "Solution writer",
    body: "Write up clean, readable official solutions for one of the problems.",
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

type Entry = { key: number; role_wanted: string; essay: string };

const emptyEntry = (key: number): Entry => ({ key, role_wanted: "grader", essay: "" });

function Contribute() {
  const [sent, setSent] = useState(0);
  const [busy, setBusy] = useState(false);
  const [entries, setEntries] = useState<Entry[]>([emptyEntry(1)]);

  function update(key: number, patch: Partial<Entry>) {
    setEntries((es) => es.map((e) => (e.key === key ? { ...e, ...patch } : e)));
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email") ?? "").trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    const filled = entries.filter((x) => x.essay.trim());
    if (filled.length === 0) {
      toast.error("Write a short essay for at least one role.");
      return;
    }
    const batch_id = crypto.randomUUID();
    const person = {
      batch_id,
      first_name: String(f.get("first_name") ?? "").trim().slice(0, 120),
      last_name: String(f.get("last_name") ?? "").trim().slice(0, 120),
      email: email.slice(0, 255),
      country: String(f.get("country") ?? "").slice(0, 100),
    };

    setBusy(true);
    const { error } = await supabase.from("public_contributor_applications").insert(
      filled.map((x) => ({
        ...person,
        role_wanted: x.role_wanted,
        essay: x.essay.trim().slice(0, 8000),
      })),
    );
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    setSent(filled.length);
    setEntries([emptyEntry(1)]);
    toast.success("Application sent — thank you!");
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

      <section id="roles" className="mx-auto max-w-4xl scroll-mt-24 px-5 py-14">
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
          contests, results, teaching, writing, anything relevant — and why you want the
          role. You can apply for more than one role at once.
        </p>

        {sent > 0 ? (
          <div className="mt-6 rounded-2xl border border-crimson bg-card p-8 text-center">
            <h3 className="font-display text-xl font-semibold text-chalk">
              Application received
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              We'll reply by email before grading season. Thank you for helping.
            </p>
            <button
              onClick={() => setSent(0)}
              className="mt-6 rounded-lg border border-border px-5 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-chalk"
            >
              Apply again
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-6 space-y-8">
            <div className="space-y-5 rounded-2xl border border-border bg-card p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <L htmlFor="first_name">Name</L>
                  <input id="first_name" name="first_name" required maxLength={120} className={field} />
                </div>
                <div>
                  <L htmlFor="last_name">Surname</L>
                  <input id="last_name" name="last_name" required maxLength={120} className={field} />
                </div>
              </div>
              <div>
                <L htmlFor="email">Email</L>
                <input id="email" name="email" type="email" required maxLength={255} className={field} />
              </div>
              <div>
                <L htmlFor="country">Country</L>
                <CountrySelect />
              </div>
            </div>

            {entries.map((x, i) => (
              <div
                key={x.key}
                className="space-y-5 rounded-2xl border border-border bg-card p-8"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-semibold text-chalk">
                    Application {i + 1}
                  </h3>
                  {entries.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setEntries((es) => es.filter((y) => y.key !== x.key))}
                      className="text-xs font-semibold uppercase tracking-[0.14em] text-crimson"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div>
                  <L htmlFor={`role-${x.key}`}>Role</L>
                  <select
                    id={`role-${x.key}`}
                    value={x.role_wanted}
                    onChange={(e) => update(x.key, { role_wanted: e.target.value })}
                    className={field}
                  >
                    {ROLES.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <L htmlFor={`essay-${x.key}`}>Your achievements & motivation</L>
                  <textarea
                    id={`essay-${x.key}`}
                    rows={8}
                    maxLength={8000}
                    value={x.essay}
                    onChange={(e) => update(x.key, { essay: e.target.value })}
                    placeholder="Contests you've taken part in, results, geometry you love, teaching or writing experience…"
                    className={field}
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() =>
                setEntries((es) => [...es, emptyEntry((es[es.length - 1]?.key ?? 0) + 1)])
              }
              className="w-full rounded-lg border border-dashed border-border px-6 py-3 font-display text-xs font-semibold uppercase tracking-[0.14em] text-chalk hover:bg-secondary"
            >
              + Apply for another role
            </button>

            <button
              disabled={busy}
              className="w-full rounded-lg bg-crimson px-6 py-3 font-display text-sm font-semibold uppercase tracking-wide text-crimson-foreground disabled:opacity-60"
            >
              {busy ? "Sending…" : "Send application"}
            </button>
            <p className="text-center text-xs text-muted-foreground">
              Or email{" "}
              <a href={`mailto:${NEW_EMAIL}`} className="text-crimson underline">
                {NEW_EMAIL}
              </a>
              .
            </p>
          </form>
        )}
      </section>
    </SiteLayout>
  );
}

const field =
  "mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-chalk outline-none focus:border-crimson";

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
