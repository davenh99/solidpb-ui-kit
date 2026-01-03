import { createMemo, Show, splitProps } from "solid-js";
import { TextField } from "@kobalte/core/text-field";
import { tv } from "tailwind-variants";
import { debounce } from "../../methods/debounce";
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
    return (<TextField class={inputRoot({ class: local.class, marginTop: local.label ? "yes" : "no" })} {...others} onChange={handleChange}>
      <div class="relative w-full">
        <Show when={local.label}>
          <TextField.Label class={inputLabel({ size: local.size })} style="transform: translateY(-50%);">
            {local.label}
          </TextField.Label>
        </Show>
        <TextField.Input class={inputField({
            appearance: local.appearance,
            variant: local.variant,
            size: local.size,
            class: local.inputProps?.class,
        })} {...local.inputProps}/>
      </div>
    </TextField>);
};
export default Input;
