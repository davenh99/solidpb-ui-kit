import { Component, splitProps, JSX } from "solid-js";
import { tv } from "tailwind-variants";

export interface SwitchProps extends Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  label?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  appearance?: "primary" | "secondary" | "success" | "warning" | "error" | "info" | "accent" | "neutral";
  onChange?: (checked: boolean) => void;
}

const toggle = tv({
  base: "toggle",
  variants: {
    size: {
      xs: "toggle-xs",
      sm: "toggle-sm",
      md: "toggle-md",
      lg: "toggle-lg",
      xl: "toggle-xl",
    },
    appearance: {
      primary: "toggle-primary",
      secondary: "toggle-secondary",
      success: "toggle-success",
      warning: "toggle-warning",
      error: "toggle-error",
      info: "toggle-info",
      accent: "toggle-accent",
      neutral: "toggle-neutral",
    },
  },
  defaultVariants: {
    size: "md",
    appearance: "neutral",
  },
});

export const Switch: Component<SwitchProps> = (props) => {
  const [local, inputProps] = splitProps(props, ["label", "size", "appearance", "class", "onChange"]);

  return (
    <label class="flex items-center gap-3">
      <input
        {...inputProps}
        type="checkbox"
        class={toggle({
          size: local.size,
          appearance: local.appearance,
          class: local.class,
        })}
        onChange={(e) => {
          local.onChange?.(Boolean(e.currentTarget.value));
        }}
      />
      {local.label && <span class="select-none">{local.label}</span>}
    </label>
  );
};

export default Switch;
