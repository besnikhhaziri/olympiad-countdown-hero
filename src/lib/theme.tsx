import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { Palette } from "lucide-react";


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
  const { theme, toggle } = useTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "white" ? "Switch to green theme" : "Switch to white theme"}
      title={theme === "white" ? "Switch to green theme" : "Switch to white theme"}
      className={`group inline-flex items-center justify-center rounded-full border border-border bg-secondary/50 p-2.5 transition-all hover:scale-105 hover:bg-background hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${className}`}
    >
      <span
        className="relative flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-primary to-crimson transition-transform duration-300 group-hover:rotate-90"
        aria-hidden="true"
      >
        <span className="h-2.5 w-2.5 rounded-full bg-primary-foreground" />
      </span>
    </button>
  );
}

