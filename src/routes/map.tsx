import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/SiteLayout";
import { WorldParticipation } from "@/components/WorldParticipation";
import { COUNTRY_BY_NAME } from "@/lib/countries";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "Participation map — Geometry Mains Olympiad" },
      {
        name: "description",
        content:
          "See every country taking part in the Geometry Mains Olympiad, from the 12 countries of the 2024 edition to everyone signing up for 2026.",
      },
      { property: "og:title", content: "Where the Geometry Mains Olympiad is solved" },
      {
        property: "og:description",
        content: "A live map of every country taking part in the olympiad.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MapPage,
});




const ALIASES: Record<string, string> = {
  kosovo: "XK",
  russia: "RU",
  "united states": "US",
  uk: "GB",
  vietnam: "VN",
  "south korea": "KR",
  iran: "IR",
  syria: "SY",
  taiwan: "TW",
  moldova: "MD",
};

function toCode(name: string): string | null {
  const key = name.trim().toLowerCase();
  return ALIASES[key] ?? COUNTRY_BY_NAME.get(key)?.code ?? null;
}

function MapPage() {
  const { data: members = [] } = useQuery({
    queryKey: ["profile-countries"],
    queryFn: async () => {
      const { data } = await supabase.from("profiles").select("country");
      return (data ?? [])
        .map((r) => r.country)
        .filter((c): c is string => Boolean(c));
    },
  });

  const totals = new Map<string, number>();
  for (const [name, n] of Object.entries(EDITION_2024)) totals.set(name, n);
  for (const name of members) totals.set(name, (totals.get(name) ?? 0) + 1);

  const mapData = [...totals.entries()]
    .map(([name, value]) => {
      const code = toCode(name);
      return code ? { country: code.toLowerCase(), value } : null;
    })
    .filter((d): d is { country: string; value: number } => d !== null);

  const sorted = [...totals.entries()].sort((a, b) => b[1] - a[1]);

  return (
    <SiteLayout>
      <section className="grid-paper border-b border-border">
        <div className="mx-auto max-w-5xl px-5 py-20">
          <div className="text-xs uppercase tracking-[0.2em] text-crimson">Worldwide</div>
          <h1 className="mt-3 font-display text-5xl font-bold text-chalk">
            Participation map
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Highlighted countries have taken part in the olympiad or have members
            registered for 2026. Countries fill in as people{" "}
            <Link to="/auth" className="text-crimson underline">
              create an account
            </Link>{" "}
            and pick where they're solving from — so the map grows with the contest.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-14">
        <WorldParticipation data={mapData} />

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            [String(totals.size), "Countries on the map"],
            [String(members.length), "Registered members"],
            ["14", "Participants in 2024"],
          ].map(([k, v]) => (
            <div key={v} className="rounded-xl border border-border bg-card p-5">
              <div className="font-display text-3xl font-bold text-crimson">{k}</div>
              <div className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                {v}
              </div>
            </div>
          ))}
        </div>

        <h2 className="mt-12 font-display text-2xl font-semibold text-chalk">
          Country breakdown
        </h2>
        <div className="mt-5 flex flex-wrap gap-2">
          {sorted.map(([name, n]) => (
            <span
              key={name}
              className="rounded-full border border-border bg-card px-4 py-1.5 text-sm text-chalk"
            >
              {name}
              <span className="ml-2 font-display text-xs font-bold text-crimson">{n}</span>
            </span>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
