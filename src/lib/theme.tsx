import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Theme = "white" | "green";
const KEY = "gmo-theme";

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggle: () => void;
}>({ theme: "white", setTheme: () => {}, toggle: () => {} });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("white");

  useEffect(() => {
    const stored = localStorage.getItem(KEY);
    if (stored === "green" || stored === "white") setThemeState(stored);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("theme-green", theme === "green");
    localStorage.setItem(KEY, theme);
  }, [theme]);

  const setTheme = useCallback((t: Theme) => setThemeState(t), []);
  const toggle = useCallback(
    () => setThemeState((t) => (t === "white" ? "green" : "white")),
    [],
  );

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  return (
    <div
      role="group"
      aria-label="Colour theme"
      className={`inline-flex items-center rounded-full border border-border p-0.5 ${className}`}
    >
      {(["white", "green"] as const).map((t) => (
        <button
          key={t}
          type="button"
          onClick={() => setTheme(t)}
          aria-pressed={theme === t}
          className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
            theme === t
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-chalk"
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
