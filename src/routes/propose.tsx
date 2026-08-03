import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { SiteLayout, NEW_EMAIL } from "@/components/SiteLayout";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/propose")({
  head: () => ({
    meta: [
      { title: "Propose a problem — Geometry Mains Olympiad" },
      {
        name: "description",
        content:
          "Submit an original synthetic geometry problem for the 2026 Geometry Mains Olympiad. Proposers are credited on the paper.",
      },
      { property: "og:title", content: "Propose a problem — Geometry Mains Olympiad" },
      {
        property: "og:description",
        content: "Send us your original geometry. Selected proposers are credited on the paper.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Propose,
});

function Propose() {
  const { user } = useAuth();
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!user) return;
    const f = new FormData(e.currentTarget);
    setBusy(true);
    const { error } = await supabase.from("problem_proposals").insert({
      user_id: user.id,
      title: String(f.get("title") ?? "").trim().slice(0, 200),
      statement: String(f.get("statement") ?? "").trim().slice(0, 5000),
      solution_sketch: String(f.get("solution_sketch") ?? "").trim().slice(0, 5000),
      difficulty: String(f.get("difficulty") ?? "medium"),
    });
    setBusy(false);
    if (error) toast.error(error.message);
    else {
      setSent(true);
      toast.success("Proposal received — thank you!");
    }
  }

  return (
    <SiteLayout>
      <section className="grid-paper border-b border-border">
        <div className="mx-auto max-w-4xl px-5 py-20">
          <div className="text-xs uppercase tracking-[0.2em] text-crimson">
            Problem committee
          </div>
          <h1 className="mt-3 font-display text-5xl font-bold text-chalk">
            Propose problems
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            The paper is built from what people send us. If you have an original
            synthetic geometry problem — a configuration you found, a lemma dressed up
            nicely, something you'd want to solve — send it here. Selected proposers are
            credited on the paper and receive a certificate.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
            <li>· Original problems only. Say so if it may already exist somewhere.</li>
            <li>· Synthetic statements preferred; no heavy computation required to solve.</li>
            <li>· Include a solution sketch so the committee can check difficulty.</li>
            <li>· Everything stays confidential until after the contest.</li>
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-5 py-16">
        {!user ? (
          <div className="rounded-2xl border border-border bg-card p-8 text-center">
            <h2 className="font-display text-2xl font-semibold text-chalk">
              Sign in to submit
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              We keep proposals attached to your account so we can credit you properly.
            </p>
            <Link
              to="/auth"
              className="mt-6 inline-block rounded-lg bg-crimson px-6 py-3 font-display text-xs font-semibold uppercase tracking-[0.14em] text-crimson-foreground"
            >
              Sign in or create an account
            </Link>
            <p className="mt-4 text-xs text-muted-foreground">
              Prefer email? Write to{" "}
              <a href={`mailto:${NEW_EMAIL}`} className="text-crimson underline">
                {NEW_EMAIL}
              </a>
              .
            </p>
          </div>
        ) : sent ? (
          <div className="rounded-2xl border border-crimson bg-card p-8 text-center">
            <h2 className="font-display text-2xl font-semibold text-chalk">
              Proposal submitted
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              The committee reads everything. You'll hear back by email before the paper
              is finalised.
            </p>
            <button
              onClick={() => setSent(false)}
              className="mt-6 rounded-lg border border-border px-5 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-chalk"
            >
              Submit another
            </button>
          </div>
        ) : (
          <form
            onSubmit={submit}
            className="space-y-5 rounded-2xl border border-border bg-card p-8"
          >
            <div>
              <L htmlFor="title">Working title</L>
              <input
                id="title"
                name="title"
                required
                maxLength={200}
                className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-chalk outline-none focus:border-crimson"
              />
            </div>
            <div>
              <L htmlFor="statement">Problem statement</L>
              <textarea
                id="statement"
                name="statement"
                required
                rows={7}
                maxLength={5000}
                className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-chalk outline-none focus:border-crimson"
              />
            </div>
            <div>
              <L htmlFor="solution_sketch">Solution sketch</L>
              <textarea
                id="solution_sketch"
                name="solution_sketch"
                rows={5}
                maxLength={5000}
                className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-chalk outline-none focus:border-crimson"
              />
            </div>
            <div>
              <L htmlFor="difficulty">Estimated difficulty</L>
              <select
                id="difficulty"
                name="difficulty"
                className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-chalk outline-none focus:border-crimson"
              >
                {["easy", "medium", "hard", "very hard"].map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
            <button
              disabled={busy}
              className="w-full rounded-lg bg-crimson px-6 py-3 font-display text-sm font-semibold uppercase tracking-wide text-crimson-foreground disabled:opacity-60"
            >
              {busy ? "Sending…" : "Submit proposal"}
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
