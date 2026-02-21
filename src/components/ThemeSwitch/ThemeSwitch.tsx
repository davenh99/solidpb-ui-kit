import { createSignal, JSXElement, onMount } from "solid-js";
import Sun from "lucide-solid/icons/sun";
import Moon from "lucide-solid/icons/moon";
import Monitor from "lucide-solid/icons/monitor";

import { DropdownMenu } from "../DropdownMenu";
import { Button } from "../Button";

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

const labelClass = "flex items-center gap-1";

const getThemeValue = (theme: Theme): JSXElement => {
  switch (theme) {
    case "light":
      return (
        <span class={labelClass}>
          <Sun class="w-[1em] h-[1em]" /> Light
        </span>
      );
    case "dark":
      return (
        <span class={labelClass}>
          <Moon class="w-[1em] h-[1em]" /> Dark
        </span>
      );
    case "system":
      return (
        <span class={labelClass}>
          <Monitor class="w-[1em] h-[1em]" /> System
        </span>
      );
  }
};

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

  const handleChange = (val: Theme) => {
    setTheme(val);
    localStorage.setItem(THEME_KEY, val);
    applyTheme(val);
  };

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger>
        <Button>{getThemeValue(theme())}</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.MenuItem onSelect={() => handleChange("light")}>
          {getThemeValue("light")}
        </DropdownMenu.MenuItem>
        <DropdownMenu.MenuItem onSelect={() => handleChange("dark")}>
          {getThemeValue("dark")}
        </DropdownMenu.MenuItem>
        <DropdownMenu.MenuItem onSelect={() => handleChange("system")}>
          {getThemeValue("system")}
        </DropdownMenu.MenuItem>
      </DropdownMenu.Content>
    </DropdownMenu>
  );
}

export default ThemeSwitch;
