import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources — Prepare for the Geometry Mains Olympiad" },
      {
        name: "description",
        content:
          "Books, problem sets and forums to prepare for olympiad geometry: EGMO, A Beautiful Journey Through Olympiad Geometry, AoPS, Iranian Geometry Olympiad, Ukrainian and Iranian problem collections.",
      },
      { property: "og:title", content: "Geometry olympiad preparation resources" },
      {
        property: "og:description",
        content:
          "The books, problem sets and forums we recommend for synthetic geometry training.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Resources,
});

const GROUPS: {
  group: string;
  blurb: string;
  items: { name: string; url: string; note: string }[];
}[] = [
  {
    group: "Books",
    blurb: "Start here. Read with a pencil, a compass and a lot of patience.",
    items: [
      {
        name: "EGMO — Euclidean Geometry in Mathematical Olympiads (Evan Chen)",
        url: "https://web.evanchen.cc/geombook.html",
        note: "The standard modern reference. Directed angles, inversion, projective ideas, and hundreds of olympiad problems.",
      },
      {
        name: "A Beautiful Journey Through Olympiad Geometry (Stefan Lozanovski)",
        url: "https://www.olympiadgeometry.com/",
        note: "Free PDF, builds from the very basics to hard configurations. Ideal if EGMO feels steep.",
      },
      {
        name: "Geometry Unbound (Kiran Kedlaya)",
        url: "https://kskedlaya.org/geometryunbound/",
        note: "Free and rigorous, strong on transformations and coordinate methods.",
      },
      {
        name: "106 Geometry Problems from the AwesomeMath Summer Program",
        url: "https://artofproblemsolving.com/store",
        note: "Pure problem practice with full solutions.",
      },
    ],
  },
  {
    group: "Handouts & lecture notes",
    blurb: "Short, dense, and exactly the tools our problems reward.",
    items: [
      {
        name: "Evan Chen's geometry handouts",
        url: "https://web.evanchen.cc/olympiad.html",
        note: "Bary coordinates, the incenter/excenter lemma, spiral similarity — free.",
      },
      {
        name: "Yufei Zhao's geometry notes",
        url: "https://yufeizhao.com/olympiad/",
        note: "Cyclic quadrilaterals, power of a point, inversion — classic handouts.",
      },
      {
        name: "\"Muricaaaa\" & community lemma lists",
        url: "https://artofproblemsolving.com/community/c6h1084633",
        note: "Crowd-sourced collections of the lemmas that keep reappearing in olympiad geometry.",
      },
    ],
  },
  {
    group: "Problem sets by country",
    blurb: "Where we get most of our inspiration when writing the paper.",
    items: [
      {
        name: "Iranian Geometry Olympiad (IGO)",
        url: "https://igo-official.com/",
        note: "Pure synthetic geometry, three levels, official papers and solutions in English.",
      },
      {
        name: "Iran TST & Iran National Olympiad geometry",
        url: "https://artofproblemsolving.com/community/c3223_iran_contests",
        note: "Beautiful and brutal. The single best training set for hard configurations.",
      },
      {
        name: "Ukrainian olympiad geometry problems",
        url: "https://artofproblemsolving.com/community/c3225_ukraine_contests",
        note: "Sharp, elegant, often short statements — very close to our style.",
      },
      {
        name: "Sharygin Geometry Olympiad",
        url: "https://geometry.ru/olimp_e.htm",
        note: "Correspondence round problems are perfect for slow, deep practice.",
      },
    ],
  },
  {
    group: "Communities & tools",
    blurb: "Ask, discuss, and draw.",
    items: [
      {
        name: "Art of Problem Solving (AoPS) forums",
        url: "https://artofproblemsolving.com/community",
        note: "Every olympiad problem ever, with solutions from the people who solved them.",
      },
      {
        name: "GeoGebra",
        url: "https://www.geogebra.org/geometry",
        note: "Draw the configuration before you conjecture. Free, works in the browser.",
      },
      {
        name: "Our Discord server",
        url: "https://discord.gg/geometrymains",
        note: "Study partners, weekly problems and announcements from the organisers.",
      },
    ],
  },
];

function Resources() {
  return (
    <SiteLayout>
      <section className="grid-paper border-b border-border">
        <div className="mx-auto max-w-5xl px-5 py-20">
          <div className="text-xs uppercase tracking-[0.2em] text-crimson">
            Preparation
          </div>
          <h1 className="mt-3 font-display text-5xl font-bold text-chalk">Resources</h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Everything below is what we would hand a student who asked "how do I get
            good at olympiad geometry?" Work through one book, one handout set and one
            country's problems — that is enough to be dangerous in November.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Already trained? Then{" "}
            <Link to="/past-papers" className="text-crimson underline">
              try the 2024 paper
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl space-y-14 px-5 py-16">
        {GROUPS.map((g) => (
          <div key={g.group}>
            <h2 className="font-display text-2xl font-semibold text-chalk">{g.group}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{g.blurb}</p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {g.items.map((i) => (
                <a
                  key={i.name}
                  href={i.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-2xl border border-border bg-card p-6 transition-colors hover:border-crimson"
                >
                  <h3 className="font-display text-base font-semibold text-chalk group-hover:text-crimson">
                    {i.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {i.note}
                  </p>
                </a>
              ))}
            </div>
          </div>
        ))}
      </section>
    </SiteLayout>
  );
}
