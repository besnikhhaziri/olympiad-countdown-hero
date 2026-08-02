import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import logo from "@/assets/gmo-logo.jpg.asset.json";
import { Marquee } from "./Marquee";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/past-papers", label: "Past Papers" },
  { to: "/register", label: "Register" },
] as const;

export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <Link to="/" className="flex items-center gap-3">
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

          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeProps={{ className: "bg-secondary text-chalk" }}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-chalk"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            onClick={() => setOpen((v) => !v)}
            className="rounded-md border border-border px-3 py-2 text-sm text-chalk md:hidden"
            aria-label="Toggle menu"
          >
            Menu
          </button>
        </div>

        {open && (
          <nav className="flex flex-col border-t border-border px-5 py-2 md:hidden">
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

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <img src={logo.url} alt="" className="h-9 w-9 rounded-full" />
            <p className="text-sm text-muted-foreground">
              Geometry Mains Olympiad — since 2024
            </p>
          </div>
          <nav className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            {NAV.map((item) => (
              <Link key={item.to} to={item.to} className="hover:text-chalk">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}
