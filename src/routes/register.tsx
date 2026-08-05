import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout, NEW_EMAIL, OLD_EMAIL } from "@/components/SiteLayout";
import { Countdown } from "@/components/Countdown";

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

const BASE_INTEREST = 14;
const KEY = "gmo-interest";

function Register() {
  const [sent, setSent] = useState(false);
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    setCount(BASE_INTEREST + Number(localStorage.getItem(KEY) ?? 0));
  }, []);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = [
      `Name: ${data.get("name")}`,
      `Surname: ${data.get("surname")}`,
      `Country: ${data.get("country")}`,
      `Email: ${data.get("email")}`,
      `School: ${data.get("school")}`,
      `Year / grade: ${data.get("grade")}`,
      "",
      "Please email me when registration for GMO 2026 opens.",
    ].join("\n");

    localStorage.setItem(KEY, String(Number(localStorage.getItem(KEY) ?? 0) + 1));
    setCount((c) => (c ?? BASE_INTEREST) + 1);
    setSent(true);

    window.location.href = `mailto:${NEW_EMAIL}?subject=${encodeURIComponent(
      "GMO 2026 — interest registration",
    )}&body=${encodeURIComponent(body)}`;
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
            <strong className="text-chalk">email you the moment the
            olympiad begins</strong>{" "}
            — registration link, timing and exam instructions included.
          </p>
          <p className="mt-4 font-display text-sm font-semibold uppercase tracking-[0.16em] text-crimson">
            {count === null ? "—" : count} people interested so far
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
              Your email app should have opened with your details — just hit
              send. We'll email you from{" "}
              <span className="text-chalk">{NEW_EMAIL}</span> well before
              November 14.
            </p>
          </div>
        ) : (
          <form
            className="space-y-5 rounded-2xl border border-border bg-card p-8 shadow-sm"
            onSubmit={submit}
          >
            {[
              { id: "name", label: "Full name", type: "text" },
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
                  className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-chalk outline-none focus:border-crimson"
                />
              </div>
            ))}

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

            <button
              type="submit"
              className="w-full rounded-lg bg-crimson px-6 py-3 font-display text-sm font-semibold uppercase tracking-wide text-crimson-foreground transition-transform hover:-translate-y-0.5"
            >
              Notify me by email
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
