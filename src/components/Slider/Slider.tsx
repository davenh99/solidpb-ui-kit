import { Component, createMemo, Show } from "solid-js";
import { debounce } from "../../methods/debounce";
import { tv } from "tailwind-variants";

export interface SliderProps {
  value?: number;
  min: number;
  max: number;
  step?: number;
  onChange?: (v: number) => void;
  saveFunc?: (v: number) => Promise<any>;
  appearance?: "neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  class?: string;
  labelClass?: string;
  label?: string;
}

const slider = tv({
  base: "range",
  variants: {
    appearance: {
      neutral: "range-neutral",
      primary: "range-primary",
      secondary: "range-secondary",
      accent: "range-accent",
      info: "range-info",
      success: "range-success",
      warning: "range-warning",
      error: "range-error",
    },
    size: {
      xs: "range-xs",
      sm: "range-sm",
      md: "range-md",
      lg: "range-lg",
      xl: "range-xl",
    },
  },
  defaultVariants: {
    appearance: "neutral",
    size: "md",
  },
});

const label = tv({
  base: "label text-xs",
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-xs",
      md: "text-xs",
      lg: "text-sm",
      xl: "text-sm",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const Slider: Component<SliderProps> = (props) => {
  const debouncedSave = createMemo(() => (props.saveFunc ? debounce(props.saveFunc) : undefined));

  const handleChange = (val: number[]) => {
    const v = val[0];
    props.onChange?.(v);
    debouncedSave()?.(v);
  };

  return (
    <label class="flex flex-col gap-1">
      <Show when={props.label}>
        <span class={label({ size: props.size, class: props.labelClass })}>{props.label}</span>
      </Show>
      <input
        class={slider({ appearance: props.appearance, size: props.size, class: props.class })}
        type="range"
        min={props.min}
        max={props.max}
        value={props.value}
        step={props.step}
        onInput={(e) => {
          handleChange([e.currentTarget.valueAsNumber]);
        }}
      />
    </label>
  );
};

export default Slider;
