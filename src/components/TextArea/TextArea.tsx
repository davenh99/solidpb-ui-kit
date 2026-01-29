import { Component, Show, splitProps, ValidComponent, createMemo } from "solid-js";
import { TextField, type TextFieldTextAreaProps, type TextFieldRootProps } from "@kobalte/core/text-field";
import type { PolymorphicProps } from "@kobalte/core";
import { tv } from "tailwind-variants";
import { debounce } from "../../methods/debounce";

export type TextAreaProps<T extends ValidComponent = "textarea"> = PolymorphicProps<
  T,
  TextFieldTextAreaProps<T>
>;

export interface TextAreaExtraProps {
  label?: string;
  saveFunc?: (v: string) => Promise<any>;
  textareaProps?: TextAreaProps;
  variant?: "none" | "ghost";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  appearance?: "primary" | "secondary" | "success" | "warning" | "neutral" | "error" | "accent" | "info";
}

export type TextAreaRootProps<T extends ValidComponent = "div"> = TextAreaExtraProps &
  PolymorphicProps<T, TextFieldRootProps<T>>;

const root = tv({
  base: "flex flex-col gap-1",
  variants: {
    marginTop: {
      yes: "mt-3",
      no: "",
    },
  },
  defaultVariants: {
    marginTop: "no",
  },
});

const textarea = tv({
  base: "textarea outline-offset-0 resize-none",
  variants: {
    variant: {
      none: "",
      ghost: "textarea-ghost",
    },
    size: {
      xs: "textarea-xs",
      sm: "textarea-sm",
      md: "textarea-md",
      lg: "textarea-lg",
      xl: "textarea-xl",
    },
    appearance: {
      primary: "textarea-primary",
      secondary: "textarea-secondary",
      success: "textarea-success",
      warning: "textarea-warning",
      neutral: "textarea-neutral",
      error: "textarea-error",
      accent: "textarea-accent",
      info: "textarea-info",
    },
  },
  defaultVariants: {
    variant: "none",
    size: "md",
    appearance: "neutral",
  },
});

export const TextArea: Component<TextAreaRootProps> = (props) => {
  const [local, others] = splitProps(props, [
    "label",
    "class",
    "textareaProps",
    "saveFunc",
    "variant",
    "size",
    "appearance",
  ]);
  let textareaRef: HTMLTextAreaElement | undefined;
  const debouncedSave = createMemo(() => (local.saveFunc ? debounce(local.saveFunc) : undefined));

  const handleChange = (v: string) => {
    props.onChange?.(v);
    debouncedSave()?.(v);
  };

  return (
    <TextField
      {...others}
      class={root({
        marginTop: local.label ? "yes" : "no",
        class: local.class,
      })}
      onChange={handleChange}
    >
      <TextField.Label class="floating-label">
        <Show when={local.label}>
          <span>{local.label}</span>
        </Show>
        <TextField.TextArea
          {...local.textareaProps}
          ref={textareaRef}
          class={textarea({
            variant: local.variant,
            appearance: local.appearance,
            size: local.size,
            class: local.textareaProps?.class,
          })}
        />
      </TextField.Label>
    </TextField>
  );
};

export default TextArea;
