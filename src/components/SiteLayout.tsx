import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import logo from "@/assets/gmo-logo.jpg";
import { Marquee } from "./Marquee";
import { ThemeToggle } from "@/lib/theme";


type NavChild = { to: string; hash?: string; label: string };
type NavItem = { to: string; label: string; children?: NavChild[] };

const NAV: NavItem[] = [
  { to: "/", label: "Home" },
  {
    to: "/about",
    label: "About",
    children: [
      { to: "/about", hash: "introduction", label: "Introduction" },
      { to: "/about", hash: "story", label: "Our story" },
      { to: "/about", hash: "founders", label: "Founders" },
      { to: "/about", hash: "format", label: "The format" },
    ],
  },
  {
    to: "/results",
    label: "Results",
    children: [
      { to: "/results", label: "1st competition — 2024" },
      { to: "/results", hash: "scoreboard", label: "Full scoreboard" },
    ],
  },
  { to: "/map", label: "Map" },
  {
    to: "/past-papers",
    label: "Past Papers",
    children: [
      { to: "/past-papers", label: "1st paper — 2024" },
      { to: "/past-papers", label: "2nd paper — 2026" },
    ],
  },
  { to: "/resources", label: "Resources" },
  { to: "/propose", label: "Propose" },
  {
    to: "/contribute",
    label: "Contribute",
    children: [
      { to: "/contribute", hash: "roles", label: "Volunteer roles" },
      { to: "/contribute", hash: "marking", label: "Marking scheme" },
      { to: "/contribute", hash: "apply", label: "Apply" },
    ],
  },
  { to: "/staff", label: "Staff" },
  { to: "/contact", label: "Contact" },
  { to: "/register", label: "Register" },
];

export const NEW_EMAIL = "geometrymainsolympiad@gmail.com";
export const OLD_EMAIL = "geometrymainsolympiad@outlook.com";
export const DISCORD_URL = "https://discord.gg/rGjsxp3jA";

export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-5 py-3">
          <Link to="/" className="flex shrink-0 items-center gap-3">
            <img
              src={logo}
              alt="Geometry Mains Olympiad logo"
              className="h-10 w-10 rounded-full ring-1 ring-crimson"
            />
            <span className="font-display text-sm font-bold uppercase leading-tight tracking-[0.14em] text-chalk">
              Geometry Mains
              <br />
              <span className="text-muted-foreground">Olympiad</span>
            </span>
          </Link>

          <div className="ml-auto hidden items-center gap-3 xl:flex">
            <nav className="flex flex-wrap items-center justify-end gap-0.5 rounded-full bg-secondary/50 p-1">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  activeProps={{
                    className: "bg-background text-chalk shadow-sm",
                  }}
                  className="whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:text-chalk"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <ThemeToggle />
          </div>

          <div className="ml-auto flex items-center gap-3 xl:hidden">
            <ThemeToggle />
            <button
              onClick={() => setOpen((v) => !v)}
              className="rounded-full border border-border px-4 py-2 text-sm text-chalk"
              aria-label="Toggle menu"
            >
              Menu
            </button>
          </div>

        </div>

        {open && (
          <nav className="flex flex-col gap-1 border-t border-border px-5 py-3 xl:hidden">
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
          </nav>
        )}
      </header>

      <Marquee />

      <main>{children}</main>

      <footer className="border-t border-border bg-secondary/40">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-3">
          <div className="flex items-start gap-3">
            <img src={logo} alt="" className="h-9 w-9 rounded-full" />
            <p className="text-sm text-muted-foreground">
              Geometry Mains Olympiad — since 2024
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-muted-foreground sm:col-span-1">
            {NAV.filter((item) =>
              ["/", "/about", "/results", "/past-papers", "/register", "/contact"].includes(
                item.to,
              ),
            ).map((item) => (
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
              Discord
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
