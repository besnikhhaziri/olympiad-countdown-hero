export const TIMELINE = [
  {
    year: "November 2024",
    title: "The first edition",
    body: "We ran the very first Geometry Mains Olympiad — a single paper of synthetic geometry problems, written and graded by hand.",
  },
  {
    year: "2025",
    title: "A year off",
    body: "We spent the year collecting problem proposals, rewriting the grading scheme and figuring out how to run the contest at a larger scale.",
  },
  {
    year: "November 2026",
    title: "The second edition",
    body: "The olympiad returns on November 14. Same spirit, more seats, and published solutions for every problem afterwards.",
  },
];

export function Introduction() {
  return (
    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
      The olympiad is run by a small volunteer team of students and former
      contestants. Everything — the paper, the grading, the website — is made by
      people who simply enjoy geometry, and entry is always free.
    </p>
  );
}

export function Story() {
  return (
    <ol className="mt-8 space-y-8 border-l border-border pl-6">
      {TIMELINE.map((t) => (
        <li key={t.year} className="relative">
          <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-crimson" />
          <div className="text-xs uppercase tracking-[0.2em] text-crimson">{t.year}</div>
          <h3 className="mt-1 font-display text-xl font-semibold text-chalk">{t.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.body}</p>
        </li>
      ))}
    </ol>
  );
}

export function Founders() {
  return (
    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
      The olympiad was founded in 2024 by a group of secondary-school geometry
      enthusiasts who wanted a contest devoted to one subject only. The founding
      team still writes and grades the paper today.
    </p>
  );
}

export function Format() {
  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2">
      {[
        ["Full written proofs", "Answers alone score nothing — argue it."],
        ["No calculators", "Straightedge and compass thinking only."],
      ].map(([t, d]) => (
        <div key={t} className="rounded-xl border border-border bg-card p-5">
          <h3 className="font-display text-lg font-semibold text-chalk">{t}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{d}</p>
        </div>
      ))}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  lead,
}: {
  eyebrow?: string;
  title: string;
  lead: string;
}) {
  return (
    <section className="grid-paper border-b border-border">
      <div className="mx-auto max-w-4xl px-5 py-20">
        {eyebrow && (
          <div className="text-xs uppercase tracking-[0.2em] text-crimson">{eyebrow}</div>
        )}
        <h1 className="mt-3 font-display text-5xl font-bold text-chalk">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{lead}</p>
      </div>
    </section>
  );
}
