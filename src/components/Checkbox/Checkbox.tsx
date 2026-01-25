import { Component, JSX, splitProps } from "solid-js";
import { tv } from "tailwind-variants";

export interface CheckboxProps extends Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  label?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  appearance?: "primary" | "secondary" | "success" | "warning" | "error" | "info" | "accent" | "neutral";
  onChange?: (checked: boolean) => void;
}

const checkbox = tv({
  base: "checkbox",
  variants: {
    size: {
      xs: "checkbox-xs",
      sm: "checkbox-sm",
      md: "checkbox-md",
      lg: "checkbox-lg",
      xl: "checkbox-xl",
    },
    appearance: {
      primary: "checkbox-primary",
      secondary: "checkbox-secondary",
      success: "checkbox-success",
      warning: "checkbox-warning",
      error: "checkbox-error",
      info: "checkbox-info",
      accent: "checkbox-accent",
      neutral: "checkbox-neutral",
    },
  },
  defaultVariants: {
    size: "md",
    appearance: "neutral",
  },
});

export const Checkbox: Component<CheckboxProps> = (props) => {
  const [local, inputProps] = splitProps(props, ["label", "size", "appearance", "class", "onChange"]);

  return (
    <label class="flex items-center gap-3">
      <input
        {...inputProps}
        type="checkbox"
        class={checkbox({
          size: local.size,
          appearance: local.appearance,
          class: local.class,
        })}
        onChange={(e) => {
          local.onChange?.(e.currentTarget.checked);
        }}
      />

      {local.label && <span class="select-none">{local.label}</span>}
    </label>
  );
};

export default Checkbox;
