import { Component, createMemo, Show, splitProps, ValidComponent } from "solid-js";
import {
  NumberField,
  type NumberFieldInputProps,
  type NumberFieldRootProps,
} from "@kobalte/core/number-field";
import type { PolymorphicProps } from "@kobalte/core";
import { debounce } from "../../methods/debounce";
import { tv } from "tailwind-variants";

export type NumberInputProps<T extends ValidComponent = "input"> = PolymorphicProps<
  T,
  NumberFieldInputProps<T>
>;

export interface ExtraProps {
  label?: string;
  variant?: "ghost" | "none";
  appearance?: "neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  inputProps?: NumberInputProps;
  saveFunc?: (v: number) => Promise<any>;
}

export type NumberInputRootProps<T extends ValidComponent = "div"> = ExtraProps &
  PolymorphicProps<T, NumberFieldRootProps<T>>;

const inputRoot = tv({
  base: "relative flex flex-col gap-1",
  variants: {
    marginTop: {
      yes: "mt-2",
      no: "",
    },
  },
  defaultVariants: {
    marginTop: "no",
  },
});

const inputField = tv({
  base: "input outline-offset-0 text-end font-semibold",
  variants: {
    variant: {
      ghost: "input-ghost",
      none: "",
    },
    size: {
      xs: "input-xs w-18",
      sm: "input-sm w-20",
      md: "input-md w-22",
      lg: "input-lg w-24",
      xl: "input-xl w-26",
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
  },
  defaultVariants: {
    variant: "none",
    size: "md",
    appearance: "neutral",
  },
});

export const NumberInput: Component<NumberInputRootProps> = (props) => {
  const [local, others] = splitProps(props, [
    "label",
    "class",
    "inputProps",
    "saveFunc",
    "variant",
    "appearance",
    "size",
  ]);

  const debouncedSave = createMemo(() => (local.saveFunc ? debounce(local.saveFunc) : undefined));

  const handleChange = (v: string) => {
    debouncedSave()?.(Number(v));
  };

  return (
    <NumberField
      {...others}
      onChange={handleChange}
      class={inputRoot({ class: local.class, marginTop: local.label ? "yes" : "no" })}
    >
      <NumberField.Label class="floating-label">
        <Show when={local.label}>
          <span>{local.label}</span>
        </Show>
        <NumberField.Input
          {...local.inputProps}
          class={inputField({
            appearance: local.appearance,
            variant: local.variant,
            size: local.size,
            class: local.inputProps?.class,
          })}
        />
      </NumberField.Label>
    </NumberField>
  );
};

export default NumberInput;
