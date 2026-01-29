import { createSignal, onMount } from "solid-js";

const THEME_KEY = "theme";
type Theme = "light" | "dark" | "system";

function getSystemTheme(): Theme {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
  return "light";
}

function applyTheme(theme: Theme) {
  const html = document.documentElement;
  let applied = theme;
  if (theme === "system") {
    applied = getSystemTheme();
  }
  html.setAttribute("data-theme", applied);
}

export function ThemeSwitch() {
  const [theme, setTheme] = createSignal<Theme>("system");

  onMount(() => {
    const saved = localStorage.getItem(THEME_KEY) as Theme | null;
    if (saved) {
      setTheme(saved);
      applyTheme(saved);
    } else {
      applyTheme("system");
    }
  });

  const handleChange = (e: Event) => {
    const value = (e.target as HTMLSelectElement).value as Theme;
    setTheme(value);
    localStorage.setItem(THEME_KEY, value);
    applyTheme(value);
  };

  return (
    <select value={theme()} onInput={handleChange} aria-label="Theme switcher">
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="system">System</option>
    </select>
  );
}

export default ThemeSwitch;
