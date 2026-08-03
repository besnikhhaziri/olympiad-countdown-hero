import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/SiteLayout";
import { useAuth } from "@/lib/auth";
import { COUNTRIES } from "@/lib/countries";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Your account — Geometry Mains Olympiad" },
      {
        name: "description",
        content:
          "Manage your Geometry Mains Olympiad profile, country and your problem proposals and contributor applications.",
      },
      { property: "og:title", content: "Your account — Geometry Mains Olympiad" },
      { property: "og:description", content: "Manage your profile and submissions." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Account,
});

function Account() {
  const { user, profile, loading, refreshProfile } = useAuth();
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setName(profile?.display_name ?? "");
    setCountry(profile?.country ?? "");
  }, [profile]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .upsert({ id: user.id, display_name: name.trim(), country });
    setSaving(false);
    if (error) toast.error(error.message);
    else {
      toast.success("Profile saved");
      await refreshProfile();
    }
  }

  return (
    <SiteLayout>
      <section className="mx-auto max-w-2xl px-5 py-20">
        <h1 className="font-display text-4xl font-bold text-chalk">Your account</h1>

        {loading ? (
          <p className="mt-6 text-sm text-muted-foreground">Loading…</p>
        ) : !user ? (
          <div className="mt-8 rounded-2xl border border-border bg-card p-8">
            <p className="text-sm text-muted-foreground">
              You need an account to manage your profile.
            </p>
            <Link
              to="/auth"
              className="mt-5 inline-block rounded-lg bg-crimson px-5 py-3 font-display text-xs font-semibold uppercase tracking-[0.14em] text-crimson-foreground"
            >
              Sign in or sign up
            </Link>
          </div>
        ) : (
          <>
            <p className="mt-3 text-sm text-muted-foreground">
              Signed in as <span className="text-chalk">{user.email}</span>
            </p>
            <form
              onSubmit={save}
              className="mt-8 space-y-5 rounded-2xl border border-border bg-card p-8"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground"
                >
                  Display name
                </label>
                <input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-chalk outline-none focus:border-crimson"
                />
              </div>
              <div>
                <label
                  htmlFor="country"
                  className="block text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground"
                >
                  Country
                </label>
                <select
                  id="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-chalk outline-none focus:border-crimson"
                >
                  <option value="">Select your country</option>
                  {COUNTRIES.map((c) => (
                    <option key={c.code} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <p className="mt-2 text-xs text-muted-foreground">
                  Your country is counted on the{" "}
                  <Link to="/map" className="text-crimson underline">
                    participation map
                  </Link>
                  .
                </p>
              </div>
              <button
                disabled={saving}
                className="rounded-lg bg-crimson px-6 py-3 font-display text-xs font-semibold uppercase tracking-[0.14em] text-crimson-foreground disabled:opacity-60"
              >
                {saving ? "Saving…" : "Save profile"}
              </button>
            </form>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Link
                to="/propose"
                className="rounded-2xl border border-border p-6 hover:bg-secondary"
              >
                <h2 className="font-display text-lg font-semibold text-chalk">
                  Propose a problem
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Submit geometry for the 2026 paper.
                </p>
              </Link>
              <Link
                to="/contribute"
                className="rounded-2xl border border-border p-6 hover:bg-secondary"
              >
                <h2 className="font-display text-lg font-semibold text-chalk">
                  Contribute
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Grade papers and earn a certificate.
                </p>
              </Link>
            </div>
          </>
        )}
      </section>
    </SiteLayout>
  );
}
