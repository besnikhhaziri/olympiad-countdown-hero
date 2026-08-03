import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useAuth } from "@/lib/auth";
import { COUNTRIES } from "@/lib/countries";
import logo from "@/assets/gmo-logo.jpg.asset.json";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in or create an account — Geometry Mains Olympiad" },
      {
        name: "description",
        content:
          "Create your Geometry Mains Olympiad account to propose problems, apply as a grader and appear on our participation map.",
      },
      { property: "og:title", content: "Sign in — Geometry Mains Olympiad" },
      {
        property: "og:description",
        content: "One account for proposals, contributions and contest updates.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [loading, setLoading] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) void navigate({ to: "/account", replace: true });
  }, [user, navigate]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    setLoading(true);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: {
              display_name: String(form.get("display_name") ?? "").trim(),
              country: String(form.get("country") ?? ""),
            },
          },
        });
        if (error) throw error;
        if (!data.session) {
          setCheckEmail(true);
          return;
        }
        toast.success("Welcome to the olympiad");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Signed in");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function google() {
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      toast.error("Google sign-in failed. Please try again.");
    }
  }

  return (
    <div className="grid min-h-screen bg-background lg:grid-cols-2">
      <aside className="relative hidden overflow-hidden bg-[oklch(0.21_0.045_166)] p-12 lg:flex lg:flex-col lg:justify-between">
        <div className="pointer-events-none absolute inset-0 grid-paper opacity-25" />
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full blur-3xl"
          style={{ background: "color-mix(in oklab, var(--crimson) 45%, transparent)" }}
        />
        <Link to="/" className="relative flex items-center gap-3">
          <img src={logo.url} alt="" className="h-11 w-11 rounded-full" />
          <span className="font-display text-sm font-bold uppercase tracking-[0.16em] text-[oklch(0.98_0.008_150)]">
            Geometry Mains Olympiad
          </span>
        </Link>

        <div className="relative">
          <h2 className="max-w-md font-display text-4xl font-bold leading-tight text-[oklch(0.98_0.008_150)]">
            Four problems.
            <br />
            Four hours.
            <br />
            <span className="text-crimson">One clean diagram.</span>
          </h2>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-[oklch(0.82_0.02_155)]">
            An account lets you propose problems, apply to grade papers for a
            certificate, and put your country on our participation map.
          </p>
        </div>

        <div className="relative flex gap-8 text-[oklch(0.82_0.02_155)]">
          {[
            ["14", "Participants"],
            ["12", "Countries"],
            ["2nd", "Edition"],
          ].map(([k, v]) => (
            <div key={v}>
              <div className="font-display text-2xl font-bold text-crimson">{k}</div>
              <div className="text-[11px] uppercase tracking-[0.18em]">{v}</div>
            </div>
          ))}
        </div>
      </aside>

      <main className="flex items-center justify-center px-5 py-16">
        <div className="w-full max-w-sm">
          <Link
            to="/"
            className="text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-chalk"
          >
            ← Back to site
          </Link>

          {checkEmail ? (
            <div className="mt-8 rounded-2xl border border-crimson bg-card p-8 text-center">
              <h1 className="font-display text-2xl font-bold text-chalk">
                Check your email
              </h1>
              <p className="mt-3 text-sm text-muted-foreground">
                We sent you a confirmation link. Click it and you'll be signed in.
              </p>
            </div>
          ) : (
            <>
              <h1 className="mt-8 font-display text-3xl font-bold text-chalk">
                {mode === "signin" ? "Welcome back" : "Create your account"}
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {mode === "signin"
                  ? "Sign in to your Geometry Mains account."
                  : "Tell us who you are and where you're solving from."}
              </p>

              <div className="mt-6 inline-flex w-full rounded-lg border border-border p-1">
                {(["signin", "signup"] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMode(m)}
                    className={`flex-1 rounded-md px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
                      mode === m
                        ? "bg-secondary text-chalk"
                        : "text-muted-foreground hover:text-chalk"
                    }`}
                  >
                    {m === "signin" ? "Sign in" : "Sign up"}
                  </button>
                ))}
              </div>

              <button
                onClick={google}
                type="button"
                className="mt-5 flex w-full items-center justify-center gap-3 rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium text-chalk transition-colors hover:bg-secondary"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                  <path fill="#4285F4" d="M23 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.2a5.3 5.3 0 0 1-2.3 3.5v2.9h3.7c2.2-2 3.4-5 3.4-8.6Z" />
                  <path fill="#34A853" d="M12 24c3.1 0 5.7-1 7.6-2.8l-3.7-2.9c-1 .7-2.3 1.1-3.9 1.1-3 0-5.5-2-6.4-4.7H1.8v3A12 12 0 0 0 12 24Z" />
                  <path fill="#FBBC05" d="M5.6 14.7a7.2 7.2 0 0 1 0-4.6v-3H1.8a12 12 0 0 0 0 10.6l3.8-3Z" />
                  <path fill="#EA4335" d="M12 4.8c1.7 0 3.2.6 4.4 1.7l3.3-3.3A11.6 11.6 0 0 0 12 0 12 12 0 0 0 1.8 6.1l3.8 3C6.5 6.8 9 4.8 12 4.8Z" />
                </svg>
                Continue with Google
              </button>

              <div className="my-5 flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
              </div>

              <form onSubmit={onSubmit} className="space-y-4">
                {mode === "signup" && (
                  <>
                    <Field id="display_name" label="Full name" />
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <select
                        id="country"
                        name="country"
                        required
                        defaultValue=""
                        className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-chalk outline-none focus:border-crimson"
                      >
                        <option value="" disabled>
                          Select your country
                        </option>
                        {COUNTRIES.map((c) => (
                          <option key={c.code} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}
                <Field id="email" label="Email" type="email" />
                <Field id="password" label="Password" type="password" />

                <button
                  disabled={loading}
                  className="w-full rounded-lg bg-crimson px-6 py-3 font-display text-sm font-semibold uppercase tracking-wide text-crimson-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-60"
                >
                  {loading
                    ? "Please wait…"
                    : mode === "signin"
                      ? "Sign in"
                      : "Create account"}
                </button>
              </form>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground"
    >
      {children}
    </label>
  );
}

function Field({ id, label, type = "text" }: { id: string; label: string; type?: string }) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <input
        id={id}
        name={id}
        type={type}
        required
        autoComplete={type === "password" ? "current-password" : "on"}
        className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-chalk outline-none focus:border-crimson"
      />
    </div>
  );
}
