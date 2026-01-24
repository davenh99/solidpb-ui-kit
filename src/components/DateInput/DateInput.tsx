import { Component, Show } from "solid-js";
import { tv } from "tailwind-variants";

interface DateInputProps {
  label?: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  variant?: "ghost" | "none";
  appearance?: "neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  class?: string;
}

const dateInput = tv({
  base: "input outline-offset-0",
  variants: {
    variant: {
      ghost: "input-ghost",
      none: "",
    },
    appearance: {
      neutral: "input-neutral",
      primary: "input-primary",
      secondary: "input-secondary",
      accent: "input-accent",
      info: "input-info",
      success: "input-success",
      warning: "input-warning",
      error: "input-error",
    },
    size: {
      xs: "input-xs",
      sm: "input-sm",
      md: "input-md",
      lg: "input-lg",
      xl: "input-xl",
    },
  },
  defaultVariants: {
    variant: "none",
    appearance: "neutral",
    size: "md",
  },
});

const label = tv({
  base: "block mb-1 text-xs font-medium",
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-xs",
      md: "text-sm",
      lg: "text-sm",
      xl: "text-md",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const DateInput: Component<DateInputProps> = (props) => {
  // Convert Date to yyyy-mm-dd string for input value
  const valueStr = () => (props.value ? props.value.toISOString().slice(0, 10) : "");
  const handleChange = (e: Event) => {
    const val = (e.target as HTMLInputElement).value;
    props.onChange(val ? new Date(val) : null);
  };
  return (
    <div class={props.class}>
      <Show when={props.label}>
        <label class={label({ size: props.size })}>{props.label}</label>
      </Show>
      <input
        type="date"
        class={dateInput({ size: props.size, variant: props.variant, appearance: props.appearance })}
        value={valueStr()}
        onInput={handleChange}
      />
    </div>
  );
};

export default DateInput;
