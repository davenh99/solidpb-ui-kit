import { Show, splitProps } from "solid-js";
import { tv } from "tailwind-variants";
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
    defaultVariants: {
        size: "sm",
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
        size: "sm",
    },
});
export const FileInput = (props) => {
    const [local, others] = splitProps(props, ["label", "class", "onChange", "saveFunc"]);
    const handleChange = (files) => {
        local.onChange?.(files);
        local.saveFunc?.(files);
    };
    return (<label class="flex flex-col gap-1 w-fit">
      <Show when={local.label}>
        <span class={label({ size: props.size })}>{local.label}</span>
      </Show>
      <input {...others} type="file" class={input({ class: local.class })} accept={props.accept} multiple={props.multiple} onChange={(e) => handleChange(e.currentTarget.files)}/>
    </label>);
};
export default FileInput;
