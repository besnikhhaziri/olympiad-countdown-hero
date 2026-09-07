import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { SiteLayout, NEW_EMAIL, OLD_EMAIL } from "@/components/SiteLayout";
import { Countdown } from "@/components/Countdown";
import { CountrySelect } from "@/components/CountrySelect";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Register — Geometry Mains Olympiad 2026" },
      {
        name: "description",
        content:
          "Register your interest for the Geometry Mains Olympiad on November 14, 2026. Free entry, open to all secondary students, notified by email.",
      },
      { property: "og:title", content: "Register — Geometry Mains Olympiad 2026" },
      {
        property: "og:description",
        content: "Free entry, open to all secondary students. November 14, 2026.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Register,
});

function Register() {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email") ?? "").trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setBusy(true);
    const { error } = await supabase.from("interest_registrations").insert({
      first_name: String(f.get("name") ?? "").trim().slice(0, 120),
      last_name: String(f.get("surname") ?? "").trim().slice(0, 120),
      email: email.slice(0, 255),
      country: String(f.get("country") ?? "").slice(0, 100),
      school: String(f.get("school") ?? "").trim().slice(0, 200),
      grade: String(f.get("grade") ?? "").slice(0, 40),
      category: String(f.get("category") ?? "").slice(0, 20),
    });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    setSent(true);
    toast.success("You're on the list — we'll email you.");
  }

  return (
    <SiteLayout>
      <section className="grid-paper border-b border-border">
        <div className="mx-auto max-w-4xl px-5 py-20">
          <h1 className="font-display text-5xl font-bold text-chalk">
            Register your interest
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            Entry is free. Leave your details and we'll{" "}
            <strong className="text-chalk">
              email you the moment the olympiad begins
            </strong>{" "}
            — registration link, timing and exam instructions included.
          </p>
          <div className="mt-10 max-w-3xl">
            <Countdown />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-xl px-5 py-16">
        {sent ? (
          <div className="rounded-2xl border border-crimson bg-card p-8 text-center">
            <h2 className="font-display text-2xl font-semibold text-chalk">
              You're on the list
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              We've saved your details. We'll email you from{" "}
              <span className="text-chalk">{NEW_EMAIL}</span> well before November 14.
            </p>
          </div>
        ) : (
          <form
            className="space-y-5 rounded-2xl border border-border bg-card p-8 shadow-sm"
            onSubmit={submit}
          >
            {[
              { id: "name", label: "Name", type: "text" },
              { id: "surname", label: "Surname", type: "text" },
              { id: "email", label: "Email address", type: "email" },
              { id: "school", label: "School", type: "text" },
            ].map((f) => (
              <div key={f.id}>
                <label
                  htmlFor={f.id}
                  className="block text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground"
                >
                  {f.label}
                </label>
                <input
                  id={f.id}
                  name={f.id}
                  type={f.type}
                  required
                  maxLength={200}
                  className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-chalk outline-none focus:border-crimson"
                />
              </div>
            ))}

            <div>
              <label
                htmlFor="country"
                className="block text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground"
              >
                Country
              </label>
              <CountrySelect required />
            </div>

            <div>
              <label
                htmlFor="grade"
                className="block text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground"
              >
                Year / grade
              </label>
              <select
                id="grade"
                name="grade"
                className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-chalk outline-none focus:border-crimson"
              >
                {["9", "10", "11", "12", "Other"].map((g) => (
                  <option key={g}>{g}</option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground"
              >
                Which level do you want to compete in?
              </label>
              <select
                id="category"
                name="category"
                required
                defaultValue="Medium"
                className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-chalk outline-none focus:border-crimson"
              >
                {["Easy", "Medium", "Hard"].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <p className="mt-2 text-xs text-muted-foreground">
                Easy, Medium and Hard are three separate categories — pick the one that
                fits you best.
              </p>
            </div>

            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-lg bg-crimson px-6 py-3 font-display text-sm font-semibold uppercase tracking-wide text-crimson-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-60"
            >
              {busy ? "Sending…" : "Notify me by email"}
            </button>
            <p className="text-center text-xs text-muted-foreground">
              Prefer to write to us directly?{" "}
              <a href={`mailto:${NEW_EMAIL}`} className="text-crimson underline">
                {NEW_EMAIL}
              </a>
              <br />
              Our old address {OLD_EMAIL} still works too.
            </p>
          </form>
        )}
      </section>
    </SiteLayout>
  );
}
