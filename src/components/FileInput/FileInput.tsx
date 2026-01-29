import { Component, Show, splitProps } from "solid-js";
import { tv } from "tailwind-variants";

interface FileInputProps {
  label?: string;
  onChange: (files: FileList | null) => void;
  accept?: string;
  multiple?: boolean;
  class?: string;
  variant?: "ghost";
  appearance?: "primary" | "secondary" | "success" | "warning" | "neutral" | "error" | "accent" | "info";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const root = tv({ base: "flex flex-col gap-1" });
const input = tv({
  base: "file-input outline-offset-0",
  variants: {
    appearance: {
      primary: "file-input-primary",
      secondary: "file-input-secondary",
      success: "file-input-success",
      warning: "file-input-warning",
      neutral: "file-input-neutral",
      error: "file-input-error",
      accent: "file-input-accent",
      info: "file-input-info",
    },
    size: {
      xs: "file-input-xs",
      sm: "file-input-sm",
      md: "file-input-md",
      lg: "file-input-lg",
      xl: "file-input-xl",
    },
    variant: {
      ghost: "file-input-ghost",
    },
  },
});

export const FileInput: Component<FileInputProps> = (props) => {
  const [local, others] = splitProps(props, ["label", "class", "onChange"]);

  return (
    <label class={root()}>
      <Show when={local.label}>
        <span class="label">{local.label}</span>
      </Show>
      <input
        {...others}
        type="file"
        class={input({ class: local.class })}
        accept={props.accept}
        multiple={props.multiple}
        onChange={(e) => local.onChange(e.currentTarget.files)}
      />
    </label>
  );
};

export default FileInput;
