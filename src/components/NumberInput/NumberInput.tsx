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

const inputLabel = tv({
  base: "absolute left-3 px-1 font-medium pointer-events-none z-10 bg-base-100",
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

const inputField = tv({
  base: "input outline-offset-0 text-end",
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
      <Show when={local.label}>
        <NumberField.Label class={inputLabel({ size: local.size })} style="transform: translateY(-50%);">
          {local.label}
        </NumberField.Label>
      </Show>
      <NumberField.Input
        class={inputField({
          appearance: local.appearance,
          variant: local.variant,
          size: local.size,
          class: local.inputProps?.class,
        })}
        {...local.inputProps}
      />
    </NumberField>
  );
};

export default NumberInput;
