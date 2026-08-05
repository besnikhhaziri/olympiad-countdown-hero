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
  const isGreen = theme === "green";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isGreen ? "Switch to white theme" : "Switch to green theme"}
      title={isGreen ? "Switch to white theme" : "Switch to green theme"}
      className={`group relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-chalk transition-all hover:scale-105 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${className}`}
    >
      <span
        className={`absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
          isGreen ? "bg-primary/10" : "bg-crimson/10"
        }`}
        aria-hidden="true"
      />
      <Palette
        className={`relative h-5 w-5 transition-colors duration-300 ${
          isGreen ? "text-primary" : "text-crimson"
        }`}
      />
    </button>
  );
}



