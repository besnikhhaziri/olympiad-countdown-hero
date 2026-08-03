import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import logo from "@/assets/gmo-logo.jpg.asset.json";
import { Marquee } from "./Marquee";
import { ThemeToggle } from "@/lib/theme";
import { useAuth } from "@/lib/auth";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/results", label: "Results" },
  { to: "/map", label: "Map" },
  { to: "/past-papers", label: "Past Papers" },
  { to: "/resources", label: "Resources" },
  { to: "/propose", label: "Propose" },
  { to: "/contribute", label: "Contribute" },
  { to: "/staff", label: "Staff" },
  { to: "/register", label: "Register" },
] as const;

export const NEW_EMAIL = "geometrymainsolympiad@gmail.com";
export const OLD_EMAIL = "geometrymainsolympiad@outlook.com";
export const DISCORD_URL = "https://discord.gg/geometrymains";

function AuthLinks({ onNavigate }: { onNavigate?: () => void }) {
  const { user, profile, signOut } = useAuth();

  if (!user) {
    return (
      <Link
        to="/auth"
        onClick={onNavigate}
        className="rounded-lg bg-crimson px-4 py-2 font-display text-xs font-semibold uppercase tracking-[0.14em] text-crimson-foreground"
      >
        Sign in
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        to="/account"
        onClick={onNavigate}
        className="rounded-lg border border-border px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-chalk"
      >
        {profile?.display_name?.split(" ")[0] ?? "Account"}
      </Link>
      <button
        onClick={() => {
          onNavigate?.();
          void signOut();
        }}
        className="text-xs uppercase tracking-[0.14em] text-muted-foreground hover:text-chalk"
      >
        Sign out
      </button>
    </div>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
          <Link to="/" className="flex shrink-0 items-center gap-3">
            <img
              src={logo.url}
              alt="Geometry Mains Olympiad logo"
              className="h-10 w-10 rounded-full ring-1 ring-crimson"
            />
            <span className="font-display text-sm font-bold uppercase leading-tight tracking-[0.14em] text-chalk">
              Geometry Mains
              <br />
              <span className="text-muted-foreground">Olympiad</span>
            </span>
          </Link>

          <nav className="hidden flex-wrap items-center justify-center gap-0.5 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeProps={{ className: "bg-secondary text-chalk" }}
                className="rounded-md px-2.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-chalk"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden shrink-0 items-center gap-3 lg:flex">
            <ThemeToggle />
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-border px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-chalk hover:bg-secondary"
            >
              Discord
            </a>
            <AuthLinks />
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="rounded-md border border-border px-3 py-2 text-sm text-chalk lg:hidden"
            aria-label="Toggle menu"
          >
            Menu
          </button>
        </div>

        {open && (
          <nav className="flex flex-col gap-1 border-t border-border px-5 py-3 lg:hidden">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="py-2 text-sm text-muted-foreground"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noreferrer"
              className="py-2 text-sm text-muted-foreground"
            >
              Discord server
            </a>
            <div className="flex items-center justify-between gap-3 border-t border-border pt-3">
              <ThemeToggle />
              <AuthLinks onNavigate={() => setOpen(false)} />
            </div>
          </nav>
        )}
      </header>

      <Marquee />

      <main>{children}</main>

      <footer className="border-t border-border bg-secondary/40">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-3">
          <div className="flex items-start gap-3">
            <img src={logo.url} alt="" className="h-9 w-9 rounded-full" />
            <p className="text-sm text-muted-foreground">
              Geometry Mains Olympiad — since 2024
            </p>
          </div>

          <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
            {NAV.map((item) => (
              <Link key={item.to} to={item.to} className="hover:text-chalk">
                {item.label}
              </Link>
            ))}
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noreferrer"
              className="hover:text-chalk"
            >
              Discord server
            </a>
          </nav>

          <div className="text-sm">
            <h2 className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-chalk">
              Contact
            </h2>
            <p className="mt-3 text-muted-foreground">
              New email —{" "}
              <a href={`mailto:${NEW_EMAIL}`} className="text-crimson underline">
                {NEW_EMAIL}
              </a>
            </p>
            <p className="mt-2 text-muted-foreground">
              Old email (still monitored) —{" "}
              <a href={`mailto:${OLD_EMAIL}`} className="hover:text-chalk">
                {OLD_EMAIL}
              </a>
            </p>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-block rounded-lg bg-crimson px-4 py-2 font-display text-xs font-semibold uppercase tracking-[0.14em] text-crimson-foreground"
            >
              Join our Discord
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
