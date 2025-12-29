import { Component, createMemo, Show, splitProps, ValidComponent } from "solid-js";
import { TextField, type TextFieldInputProps, type TextFieldRootProps } from "@kobalte/core/text-field";
import type { PolymorphicProps } from "@kobalte/core";
import { tv } from "tailwind-variants";

import { debounce } from "../../methods/debounce";

type InputProps<T extends ValidComponent = "input"> = PolymorphicProps<T, TextFieldInputProps<T>>;

interface ExtraProps {
  label?: string;
  variant?: "bordered" | "none";
  size?: "sm" | "md";
  inputProps?: InputProps;
  saveFunc?: (v: string) => Promise<any>;
}

type InputRootProps<T extends ValidComponent = "div"> = ExtraProps &
  PolymorphicProps<T, TextFieldRootProps<T>>;

const inputRoot = tv({
  base: "relative flex flex-col gap-1",
});

const inputField = tv({
  base: `w-full rounded-sm outline-none px-2 py-3 transition-all
    bg-[var(--color-light-surface)] dark:bg-[var(--color-dark-surface)]
    text-[var(--color-text-light-primary)] dark:text-[var(--color-text-dark-primary)]`,
  variants: {
    variant: {
      bordered: `border-2 border-[var(--color-light-muted)] dark:border-[var(--color-dark-muted)]
        focus:border-[var(--color-light-primary)] dark:focus:border-[var(--color-dark-primary)]`,
      none: "",
    },
  },
  defaultVariants: {
    variant: "none",
  },
});

export const Input: Component<InputRootProps> = (props) => {
  const [local, others] = splitProps(props, [
    "label",
    "class",
    "variant",
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
    <TextField class={inputRoot({ class: local.class })} {...others} onChange={handleChange}>
      <div class="relative w-full">
        <Show when={local.label}>
          <TextField.Label
            class="absolute -top-3 left-2 px-1 bg-[var(--color-light-surface)] dark:bg-[var(--color-dark-surface)] text-xs font-medium text-[var(--color-text-light-secondary)] dark:text-[var(--color-text-dark-secondary)] pointer-events-none z-10"
            style="transform: translateY(-50%);"
          >
            {local.label}
          </TextField.Label>
        </Show>
        <TextField.Input
          class={inputField({ variant: local.variant, class: local.inputProps?.class })}
          {...local.inputProps}
        />
      </div>
    </TextField>
  );
};

export default Input;
