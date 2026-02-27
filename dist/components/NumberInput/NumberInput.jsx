import { createMemo, Show, splitProps } from "solid-js";
import { NumberField, } from "@kobalte/core/number-field";
import { debounce } from "../../methods/debounce";
import { tv } from "tailwind-variants";
const inputRoot = tv({
    base: "relative flex flex-col gap-1",
});
const inputField = tv({
    base: "input outline-offset-0 text-end font-semibold",
    variants: {
        variant: {
            ghost: "input-ghost",
            none: "",
        },
        size: {
            xs: "input-xs w-18",
            sm: "input-sm w-20",
            md: "input-md w-22",
            lg: "input-lg w-24",
            xl: "input-xl w-26",
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
export const NumberInput = (props) => {
    const [local, others] = splitProps(props, [
        "label",
        "class",
        "inputProps",
        "saveFunc",
        "variant",
        "appearance",
        "size",
    ]);
    const debouncedSave = createMemo(() => (local.saveFunc ? debounce(local.saveFunc) : undefined));
    const handleChange = (v) => {
        debouncedSave()?.(Number(v));
    };
    return (<NumberField {...others} onChange={handleChange} class={inputRoot({ class: local.class })}>
      <NumberField.Label class="floating-label">
        <Show when={local.label}>
          <span>{local.label}</span>
        </Show>
        <NumberField.Input {...local.inputProps} class={inputField({
            appearance: local.appearance,
            variant: local.variant,
            size: local.size,
            class: local.inputProps?.class,
        })}/>
      </NumberField.Label>
    </NumberField>);
};
export default NumberInput;
