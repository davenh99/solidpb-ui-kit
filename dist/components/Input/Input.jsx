import { createMemo, Show, splitProps } from "solid-js";
import { TextField } from "@kobalte/core/text-field";
import { tv } from "tailwind-variants";
import { debounce } from "../../methods/debounce";
const inputRoot = tv({
    base: "relative flex flex-col gap-1",
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
        size: "sm",
    },
});
export const Input = (props) => {
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
    const handleChange = (v) => {
        local.onChange?.(v);
        debouncedSave()?.(v);
    };
    return (<TextField {...others} class={inputRoot({ class: local.class })} onChange={handleChange}>
      <div class="relative w-full">
        <TextField.Label class="floating-label">
          <Show when={local.label}>
            <span>{local.label}</span>
          </Show>
          <TextField.Input {...local.inputProps} class={inputField({
            appearance: local.appearance,
            variant: local.variant,
            size: local.size,
            class: local.inputProps?.class,
        })}/>
        </TextField.Label>
      </div>
    </TextField>);
};
export default Input;
