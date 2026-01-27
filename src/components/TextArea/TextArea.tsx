import { createEffect, on, Component, Show, splitProps, ValidComponent, createMemo } from "solid-js";
import { TextField, type TextFieldInputProps, type TextFieldRootProps } from "@kobalte/core/text-field";
import type { PolymorphicProps } from "@kobalte/core";
import { tv } from "tailwind-variants";
import { debounce } from "../../methods/debounce";

export type InputProps<T extends ValidComponent = "textarea"> = PolymorphicProps<T, TextFieldInputProps<T>>;

export interface ExtraProps {
  label?: string;
  saveFunc?: (v: string) => Promise<any>;
  inputProps?: InputProps;
  variant?: "none" | "ghost";
  size?: "sm" | "md";
  autoSize?: boolean;
}

export type TextAreaRootProps<T extends ValidComponent = "div"> = ExtraProps &
  PolymorphicProps<T, TextFieldRootProps<T>>;

const root = tv({ base: "flex flex-col gap-1" });

const textarea = tv({
  base: "textarea outline-offset-0",
  variants: {
    variant: {
      none: "",
      ghost: "textarea-ghost",
    },
  },
  defaultVariants: {
    variant: "none",
  },
});

export const TextArea: Component<TextAreaRootProps> = (props) => {
  const [local, others] = splitProps(props, ["label", "class", "inputProps", "saveFunc", "variant"]);
  let textareaRef: HTMLTextAreaElement | undefined;
  const debouncedSave = createMemo(() => (local.saveFunc ? debounce(local.saveFunc) : undefined));

  const handleChange = (v: string) => {
    props.onChange?.(v);
    debouncedSave()?.(v);
  };

  const autoResize = () => {
    if (!textareaRef) return;
    textareaRef.style.height = "auto";
    textareaRef.style.height = `${textareaRef.scrollHeight}px`;
  };

  createEffect(
    on(
      () => others.value,
      () => {
        if (props.autoSize) autoResize();
      },
    ),
  );

  return (
    <TextField class={root({ class: local.class })} {...others} onChange={handleChange}>
      <Show when={local.label}>
        <TextField.Label>{local.label}</TextField.Label>
      </Show>
      <TextField.TextArea
        ref={textareaRef}
        class={textarea({ variant: local.variant, class: local.inputProps?.class })}
        {...local.inputProps}
      />
    </TextField>
  );
};

export default TextArea;
