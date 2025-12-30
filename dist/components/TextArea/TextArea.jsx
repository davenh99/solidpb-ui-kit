import { createEffect, on, Show, splitProps, createMemo } from "solid-js";
import { TextField } from "@kobalte/core/text-field";
import { tv } from "tailwind-variants";
import { debounce } from "../../methods/debounce";
const root = tv({ base: "flex flex-col gap-1" });
const textarea = tv({
    base: "w-full resize-none rounded-sm outline-none px-2 py-1 min-h-[80px]",
    variants: {
        variant: {
            bordered: "border-2 border-[var(--color-light-muted)] dark:border-[var(--color-dark-muted)]",
            none: "",
        },
    },
    defaultVariants: {
        variant: "none",
    },
});
export const TextArea = (props) => {
    const [local, others] = splitProps(props, ["label", "class", "inputProps", "saveFunc", "variant"]);
    let textareaRef;
    const debouncedSave = createMemo(() => (local.saveFunc ? debounce(local.saveFunc) : undefined));
    const handleChange = (v) => {
        props.onChange?.(v);
        debouncedSave()?.(v);
    };
    const autoResize = () => {
        if (!textareaRef)
            return;
        textareaRef.style.height = "auto";
        textareaRef.style.height = `${textareaRef.scrollHeight}px`;
    };
    createEffect(on(() => others.value, () => autoResize()));
    return (<TextField class={root({ class: local.class })} {...others} onChange={handleChange}>
      <Show when={local.label}>
        <TextField.Label>{local.label}</TextField.Label>
      </Show>
      <TextField.TextArea ref={textareaRef} class={textarea({ variant: local.variant, class: local.inputProps?.class })} {...local.inputProps}/>
    </TextField>);
};
export default TextArea;
