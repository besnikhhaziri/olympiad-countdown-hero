import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/SiteLayout";
import { useAuth } from "@/lib/auth";
import { COUNTRIES } from "@/lib/countries";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/staff-admin")({
  head: () => ({
    meta: [
      { title: "Participation admin — Geometry Mains Olympiad" },
      {
        name: "description",
        content:
          "Staff tool for adding and editing the country participation entries that power the Geometry Mains Olympiad world map.",
      },
      { property: "og:title", content: "Participation admin — Geometry Mains Olympiad" },
      {
        property: "og:description",
        content: "Keep the olympiad participation map accurate for every edition.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StaffAdmin,
});

type Entry = {
  id: string;
  country: string;
  edition: number;
  participants: number;
};

const input =
  "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-chalk outline-none focus:border-crimson";

function StaffAdmin() {
  const { user, loading } = useAuth();
  const qc = useQueryClient();

  const { data: isStaff, isLoading: roleLoading } = useQuery({
    queryKey: ["is-staff", user?.id],
    enabled: Boolean(user),
    queryFn: async () => {
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .in("role", ["staff", "admin"]);
      return (data ?? []).length > 0;
    },
  });

  const { data: entries = [] } = useQuery({
    queryKey: ["country-participation"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("country_participation")
        .select("id, country, edition, participants")
        .order("edition", { ascending: false })
        .order("country");
      if (error) throw error;
      return data as Entry[];
    },
  });

  const [country, setCountry] = useState("");
  const [edition, setEdition] = useState(2026);
  const [participants, setParticipants] = useState(1);
  const [busy, setBusy] = useState(false);

  const refresh = () => {
    void qc.invalidateQueries({ queryKey: ["country-participation"] });
    void qc.invalidateQueries({ queryKey: ["map-participation"] });
  };

  async function addEntry(e: React.FormEvent) {
    e.preventDefault();
    if (!country) return toast.error("Pick a country");
    setBusy(true);
    const { error } = await supabase
      .from("country_participation")
      .upsert(
        { country, edition, participants },
        { onConflict: "country,edition" },
      );
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success(`${country} saved for ${edition}`);
    setCountry("");
    setParticipants(1);
    refresh();
  }

  async function updateCount(id: string, value: number) {
    const { error } = await supabase
      .from("country_participation")
      .update({ participants: value })
      .eq("id", id);
    if (error) toast.error(error.message);
    else refresh();
  }

  async function remove(id: string) {
    const { error } = await supabase
      .from("country_participation")
      .delete()
      .eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success("Entry removed");
      refresh();
    }
  }

  return (
    <SiteLayout>
      <section className="mx-auto max-w-4xl px-5 py-20">
        <div className="text-xs uppercase tracking-[0.2em] text-crimson">Staff only</div>
        <h1 className="mt-3 font-display text-4xl font-bold text-chalk">
          Participation admin
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Add or edit the country entries behind the{" "}
          <Link to="/map" className="text-crimson underline">
            participation map
          </Link>{" "}
          so it stays accurate for every edition.
        </p>

        {loading || roleLoading ? (
          <p className="mt-8 text-sm text-muted-foreground">Loading…</p>
        ) : !user ? (
          <div className="mt-8 rounded-2xl border border-border bg-card p-8">
            <p className="text-sm text-muted-foreground">
              Sign in with a staff account to manage participation.
            </p>
            <Link
              to="/auth"
              className="mt-5 inline-block rounded-lg bg-crimson px-5 py-3 font-display text-xs font-semibold uppercase tracking-[0.14em] text-crimson-foreground"
            >
              Sign in
            </Link>
          </div>
        ) : !isStaff ? (
          <div className="mt-8 rounded-2xl border border-border bg-card p-8">
            <p className="text-sm text-muted-foreground">
              This page is limited to staff. Ask an organiser to grant your account
              staff access, then reload this page.
            </p>
          </div>
        ) : (
          <>
            <form
              onSubmit={addEntry}
              className="mt-8 grid gap-4 rounded-2xl border border-border bg-card p-6 sm:grid-cols-[2fr_1fr_1fr_auto] sm:items-end"
            >
              <div>
                <label
                  htmlFor="c"
                  className="block text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground"
                >
                  Country
                </label>
                <select
                  id="c"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className={`mt-2 ${input}`}
                >
                  <option value="">Select…</option>
                  {COUNTRIES.map((c) => (
                    <option key={c.code} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="e"
                  className="block text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground"
                >
                  Edition
                </label>
                <input
                  id="e"
                  type="number"
                  value={edition}
                  onChange={(e) => setEdition(Number(e.target.value))}
                  className={`mt-2 ${input}`}
                />
              </div>
              <div>
                <label
                  htmlFor="p"
                  className="block text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground"
                >
                  Participants
                </label>
                <input
                  id="p"
                  type="number"
                  min={0}
                  value={participants}
                  onChange={(e) => setParticipants(Number(e.target.value))}
                  className={`mt-2 ${input}`}
                />
              </div>
              <button
                disabled={busy}
                className="rounded-lg bg-crimson px-5 py-2.5 font-display text-xs font-semibold uppercase tracking-[0.14em] text-crimson-foreground disabled:opacity-60"
              >
                {busy ? "Saving…" : "Save"}
              </button>
            </form>

            <h2 className="mt-12 font-display text-2xl font-semibold text-chalk">
              Entries ({entries.length})
            </h2>
            <div className="mt-4 overflow-hidden rounded-2xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-secondary/60 text-left text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3">Country</th>
                    <th className="px-4 py-3">Edition</th>
                    <th className="px-4 py-3">Participants</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {entries.map((row) => (
                    <tr key={row.id} className="border-t border-border">
                      <td className="px-4 py-2 text-chalk">{row.country}</td>
                      <td className="px-4 py-2 text-muted-foreground">{row.edition}</td>
                      <td className="px-4 py-2">
                        <input
                          type="number"
                          min={0}
                          defaultValue={row.participants}
                          onBlur={(e) => {
                            const v = Number(e.target.value);
                            if (v !== row.participants) void updateCount(row.id, v);
                          }}
                          aria-label={`Participants for ${row.country} ${row.edition}`}
                          className="w-24 rounded-md border border-input bg-background px-2 py-1 text-chalk outline-none focus:border-crimson"
                        />
                      </td>
                      <td className="px-4 py-2 text-right">
                        <button
                          onClick={() => void remove(row.id)}
                          className="text-xs uppercase tracking-[0.14em] text-muted-foreground hover:text-crimson"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {entries.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-4 py-6 text-center text-muted-foreground"
                      >
                        No entries yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>
    </SiteLayout>
  );
}
