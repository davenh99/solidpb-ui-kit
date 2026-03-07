import { Component, createSignal, JSXElement, For } from "solid-js";
import Monitor from "lucide-solid/icons/monitor";
import { tv } from "tailwind-variants";

import { DropdownMenu } from "../DropdownMenu";
import { THEME_KEY } from "../../constants";

export interface ThemeOption {
  value: string;
  label: JSXElement;
}

interface ThemeSwitchProps {
  triggerClass?: string;
  options: ThemeOption[];
}

const trigger = tv({
  base: "min-w-30",
});

const SystemOption = () => (
  <span class="flex items-center gap-1">
    <Monitor class="w-[1em] h-[1em]" /> System
  </span>
);

export const ThemeSwitch: Component<ThemeSwitchProps> = (props) => {
  const options = () => props.options;
  const [theme, setTheme] = createSignal<string>("system");

  const handleChange = (val: string) => {
    setTheme(val);
    if (val === "system") {
      localStorage.removeItem(THEME_KEY);
      document.documentElement.removeAttribute("data-theme");
      return;
    }
    localStorage.setItem(THEME_KEY, val);
    document.documentElement.setAttribute("data-theme", val);
  };

  const getCurrentLabel = () => {
    const current = theme();
    if (current === "system") {
      return <SystemOption />;
    }
    const option = options().find((opt) => opt.value === current);
    return option?.label || current;
  };

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger class={trigger({ class: props.triggerClass })}>
        {getCurrentLabel()}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <For each={options()}>
          {(option) => (
            <DropdownMenu.MenuItem onSelect={() => handleChange(option.value)}>
              {option.label}
            </DropdownMenu.MenuItem>
          )}
        </For>
        <DropdownMenu.MenuItem onSelect={() => handleChange("system")}>
          <SystemOption />
        </DropdownMenu.MenuItem>
      </DropdownMenu.Content>
    </DropdownMenu>
  );
};

export default ThemeSwitch;
