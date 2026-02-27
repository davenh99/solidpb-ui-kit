import { Show, splitProps, createMemo } from "solid-js";
import { TextField } from "@kobalte/core/text-field";
import { tv } from "tailwind-variants";
import { debounce } from "../../methods/debounce";
const root = tv({
    base: "flex flex-col gap-1",
    variants: {
        marginTop: {
            yes: "mt-3",
            no: "",
        },
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
        size: "sm",
    },
});
export const TextArea = (props) => {
    const [local, others] = splitProps(props, [
        "label",
        "class",
        "textareaProps",
        "saveFunc",
        "variant",
        "size",
        "appearance",
    ]);
    let textareaRef;
    const debouncedSave = createMemo(() => (local.saveFunc ? debounce(local.saveFunc) : undefined));
    const handleChange = (v) => {
        props.onChange?.(v);
        debouncedSave()?.(v);
    };
    return (<TextField {...others} class={root({
            marginTop: local.label ? "yes" : "no",
            class: local.class,
        })} onChange={handleChange}>
      <TextField.Label class="floating-label">
        <Show when={local.label}>
          <span>{local.label}</span>
        </Show>
        <TextField.TextArea {...local.textareaProps} ref={textareaRef} class={textarea({
            variant: local.variant,
            appearance: local.appearance,
            size: local.size,
            class: local.textareaProps?.class,
        })}/>
      </TextField.Label>
    </TextField>);
};
export default TextArea;
