import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { SiteLayout, NEW_EMAIL } from "@/components/SiteLayout";
import { CountrySelect } from "@/components/CountrySelect";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/propose")({
  head: () => ({
    meta: [
      { title: "Propose a problem — Geometry Mains Olympiad" },
      {
        name: "description",
        content:
          "Submit original synthetic geometry problems for the 2026 Geometry Mains Olympiad. Send as many as you like — proposers are credited on the paper.",
      },
      { property: "og:title", content: "Propose a problem — Geometry Mains Olympiad" },
      {
        property: "og:description",
        content:
          "Send us your original geometry. Selected proposers are credited on the paper.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Propose,
});

type ProblemDraft = {
  key: number;
  title: string;
  statement: string;
  solution_sketch: string;
  difficulty: string;
};

const emptyProblem = (key: number): ProblemDraft => ({
  key,
  title: "",
  statement: "",
  solution_sketch: "",
  difficulty: "medium",
});

function Propose() {
  const [sent, setSent] = useState(0);
  const [busy, setBusy] = useState(false);
  const [problems, setProblems] = useState<ProblemDraft[]>([emptyProblem(1)]);

  function update(key: number, patch: Partial<ProblemDraft>) {
    setProblems((ps) => ps.map((p) => (p.key === key ? { ...p, ...patch } : p)));
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email") ?? "").trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    const filled = problems.filter((p) => p.title.trim() && p.statement.trim());
    if (filled.length === 0) {
      toast.error("Add at least one problem with a title and a statement.");
      return;
    }
    const batch_id = crypto.randomUUID();
    const author = {
      batch_id,
      first_name: String(f.get("first_name") ?? "").trim().slice(0, 120),
      last_name: String(f.get("last_name") ?? "").trim().slice(0, 120),
      email: email.slice(0, 255),
      country: String(f.get("country") ?? "").slice(0, 100),
    };

    setBusy(true);
    const { error } = await supabase.from("public_problem_proposals").insert(
      filled.map((p) => ({
        ...author,
        title: p.title.trim().slice(0, 200),
        statement: p.statement.trim().slice(0, 5000),
        solution_sketch: p.solution_sketch.trim().slice(0, 5000),
        difficulty: p.difficulty,
      })),
    );
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    setSent(filled.length);
    setProblems([emptyProblem(1)]);
    toast.success(`${filled.length} problem${filled.length === 1 ? "" : "s"} received — thank you!`);
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
            The paper is built from what people send us. Fill in your details once and
            submit as many problems as you like — selected proposers are credited on the
            paper and receive a certificate.
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
        {sent > 0 ? (
          <div className="rounded-2xl border border-crimson bg-card p-8 text-center">
            <h2 className="font-display text-2xl font-semibold text-chalk">
              {sent} problem{sent === 1 ? "" : "s"} submitted
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              The committee reads everything. You'll hear back by email before the paper
              is finalised.
            </p>
            <button
              onClick={() => setSent(0)}
              className="mt-6 rounded-lg border border-border px-5 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-chalk"
            >
              Submit more problems
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-8">
            <div className="space-y-5 rounded-2xl border border-border bg-card p-8">
              <h2 className="font-display text-xl font-semibold text-chalk">
                Your details
              </h2>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <L htmlFor="first_name">Name</L>
                  <Input id="first_name" name="first_name" required />
                </div>
                <div>
                  <L htmlFor="last_name">Surname</L>
                  <Input id="last_name" name="last_name" required />
                </div>
              </div>
              <div>
                <L htmlFor="email">Email</L>
                <Input id="email" name="email" type="email" required />
              </div>
              <div>
                <L htmlFor="country">Country</L>
                <CountrySelect />
              </div>
            </div>

            {problems.map((p, i) => (
              <div
                key={p.key}
                className="space-y-5 rounded-2xl border border-border bg-card p-8"
              >
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-xl font-semibold text-chalk">
                    Problem {i + 1}
                  </h2>
                  {problems.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        setProblems((ps) => ps.filter((x) => x.key !== p.key))
                      }
                      className="text-xs font-semibold uppercase tracking-[0.14em] text-crimson"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div>
                  <L htmlFor={`title-${p.key}`}>Working title</L>
                  <Input
                    id={`title-${p.key}`}
                    value={p.title}
                    maxLength={200}
                    onChange={(e) => update(p.key, { title: e.target.value })}
                  />
                </div>
                <div>
                  <L htmlFor={`statement-${p.key}`}>Problem statement</L>
                  <textarea
                    id={`statement-${p.key}`}
                    rows={7}
                    maxLength={5000}
                    value={p.statement}
                    onChange={(e) => update(p.key, { statement: e.target.value })}
                    className={field}
                  />
                </div>
                <div>
                  <L htmlFor={`sketch-${p.key}`}>Solution sketch</L>
                  <textarea
                    id={`sketch-${p.key}`}
                    rows={5}
                    maxLength={5000}
                    value={p.solution_sketch}
                    onChange={(e) => update(p.key, { solution_sketch: e.target.value })}
                    className={field}
                  />
                </div>
                <div>
                  <L htmlFor={`difficulty-${p.key}`}>Estimated difficulty</L>
                  <select
                    id={`difficulty-${p.key}`}
                    value={p.difficulty}
                    onChange={(e) => update(p.key, { difficulty: e.target.value })}
                    className={field}
                  >
                    {["easy", "medium", "hard", "very hard"].map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() =>
                setProblems((ps) => [
                  ...ps,
                  emptyProblem((ps[ps.length - 1]?.key ?? 0) + 1),
                ])
              }
              className="w-full rounded-lg border border-dashed border-border px-6 py-3 font-display text-xs font-semibold uppercase tracking-[0.14em] text-chalk hover:bg-secondary"
            >
              + Add more problems
            </button>

            <button
              disabled={busy}
              className="w-full rounded-lg bg-crimson px-6 py-3 font-display text-sm font-semibold uppercase tracking-wide text-crimson-foreground disabled:opacity-60"
            >
              {busy ? "Sending…" : "Submit proposals"}
            </button>
            <p className="text-center text-xs text-muted-foreground">
              Prefer email? Write to{" "}
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

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={field} />;
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
