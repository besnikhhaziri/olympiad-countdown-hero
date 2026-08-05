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
      className={`group relative inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-3 py-2 text-sm font-medium text-chalk transition-all hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${className}`}
    >
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full transition-colors duration-300 ${
          isGreen ? "bg-primary text-primary-foreground" : "bg-crimson text-crimson-foreground"
        }`}
      >
        <Palette className="h-3.5 w-3.5" />
      </span>
      <span className="hidden sm:inline">{isGreen ? "White" : "Green"}</span>
    </button>
  );
}


