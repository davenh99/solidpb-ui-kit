import { splitProps } from "solid-js";
import { tv } from "tailwind-variants";
const toggle = tv({
    base: "toggle",
    variants: {
        size: {
            xs: "toggle-xs",
            sm: "toggle-sm",
            md: "toggle-md",
            lg: "toggle-lg",
            xl: "toggle-xl",
        },
        appearance: {
            primary: "toggle-primary",
            secondary: "toggle-secondary",
            success: "toggle-success",
            warning: "toggle-warning",
            error: "toggle-error",
            info: "toggle-info",
            accent: "toggle-accent",
            neutral: "toggle-neutral",
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
export const Switch = (props) => {
    const [local, inputProps] = splitProps(props, ["label", "size", "appearance", "class", "onChange"]);
    return (<label class="flex items-center gap-3 w-fit">
      <input {...inputProps} type="checkbox" class={toggle({
            size: local.size,
            appearance: local.appearance,
            class: local.class,
        })} onChange={(e) => {
            local.onChange?.(e.currentTarget.checked);
        }}/>
      {local.label && <span class={label({ size: local.size })}>{local.label}</span>}
    </label>);
};
export default Switch;
