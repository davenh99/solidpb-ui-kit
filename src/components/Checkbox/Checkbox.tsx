import { Component, createMemo, Show, ValidComponent } from "solid-js";
import { CheckboxRootProps, Checkbox as KCheckbox } from "@kobalte/core/checkbox";
import Check from "lucide-solid/icons/check";
import { PolymorphicProps } from "@kobalte/core";
import { tv } from "tailwind-variants";

import { debounce } from "../../methods/debounce";

type CheckBoxProps<T extends ValidComponent = "div"> = PolymorphicProps<T, CheckboxRootProps<T>>;

interface Props extends CheckBoxProps {
  label?: string;
  appearance?: "primary" | "secondary" | "success" | "warning" | "neutral" | "error" | "accent" | "info";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  saveFunc?: (v: boolean) => Promise<void>;
}

const checkbox = tv({
  base: "checkbox border-2",
  variants: {
    appearance: {
      primary: "checkbox-primary",
      secondary: "checkbox-secondary",
      success: "checkbox-success",
      warning: "checkbox-warning",
      neutral: "checkbox-neutral",
      error: "checkbox-error",
      accent: "checkbox-accent",
      info: "checkbox-info",
    },
    size: {
      xs: "checkbox-xs",
      sm: "checkbox-sm",
      md: "checkbox-md",
      lg: "checkbox-lg",
      xl: "checkbox-xl",
    },
  },
  defaultVariants: {
    appearance: "neutral",
    size: "md",
  },
});

const checkboxWrapper = tv({
  base: "flex flex-row space-x-2 items-center",
});

const iconSizeMap: Record<NonNullable<Props["size"]>, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 25,
  xl: 28,
};

const posMap: Record<NonNullable<Props["size"]>, string> = {
  xs: "-top-2.25 right-0.5",
  sm: "-top-3 right-0.75",
  md: "-top-3.75 right-1",
  lg: "-top-4.5 right-1.25",
  xl: "-top-5.25 right-1.5",
};

export const Checkbox: Component<Props> = (props) => {
  const debouncedSave = createMemo(() => (props.saveFunc ? debounce(props.saveFunc) : undefined));

  const handleChange = (v: boolean) => {
    props.onChange?.(v);
    debouncedSave()?.(v);
  };

  return (
    <KCheckbox
      checked={props.checked}
      onChange={handleChange}
      class={checkboxWrapper({ class: props.class })}
    >
      <KCheckbox.Input />
      <KCheckbox.Control
        class={checkbox({
          appearance: props.appearance,
          size: props.size,
          class: props.checked ? "bg-(--input-color)" : "",
        })}
      >
        <KCheckbox.Indicator class={`relative ${posMap[props.size || "md"]}`}>
          <Check size={iconSizeMap[props.size || "md"]} stroke-width={3} />
        </KCheckbox.Indicator>
      </KCheckbox.Control>
      <Show when={props.label}>
        <KCheckbox.Label>{props.label}</KCheckbox.Label>
      </Show>
    </KCheckbox>
  );
};

export default Checkbox;
