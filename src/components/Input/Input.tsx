import { Component, createMemo, Show, splitProps, ValidComponent } from "solid-js";
import { TextField, type TextFieldInputProps, type TextFieldRootProps } from "@kobalte/core/text-field";
import type { PolymorphicProps } from "@kobalte/core";
import { tv } from "tailwind-variants";

import { debounce } from "../../methods/debounce";

export type InputProps<T extends ValidComponent = "input"> = PolymorphicProps<T, TextFieldInputProps<T>>;

export interface ExtraProps {
  label?: string;
  variant?: "ghost" | "none";
  appearance?: "neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  inputProps?: InputProps;
  saveFunc?: (v: string) => Promise<any>;
}

export type InputRootProps<T extends ValidComponent = "div"> = ExtraProps &
  PolymorphicProps<T, TextFieldRootProps<T>>;

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
  base: "input outline-offset-0",
  variants: {
    variant: {
      ghost: "input-ghost",
      none: "",
    },
    size: {
      xs: "input-xs",
      sm: "input-sm",
      md: "input-md",
      lg: "input-lg",
      xl: "input-xl",
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

export const Input: Component<InputRootProps> = (props) => {
  const [local, others] = splitProps(props, [
    "label",
    "class",
    "variant",
    "appearance",
    "size",
    "inputProps",
    "saveFunc",
    "onChange",
  ]);

  const debouncedSave = createMemo(() => (local.saveFunc ? debounce(local.saveFunc) : undefined));

  const handleChange = (v: string) => {
    local.onChange?.(v);
    debouncedSave()?.(v);
  };

  return (
    <TextField
      {...others}
      class={inputRoot({ class: local.class, marginTop: local.label ? "yes" : "no" })}
      onChange={handleChange}
    >
      <div class="relative w-full">
        <Show when={local.label}>
          <TextField.Label class={inputLabel({ size: local.size })} style="transform: translateY(-50%);">
            {local.label}
          </TextField.Label>
        </Show>
        <TextField.Input
          {...local.inputProps}
          class={inputField({
            appearance: local.appearance,
            variant: local.variant,
            size: local.size,
            class: local.inputProps?.class,
          })}
        />
      </div>
    </TextField>
  );
};

export default Input;
