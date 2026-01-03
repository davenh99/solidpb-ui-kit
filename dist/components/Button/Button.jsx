import { createMemo, Show, splitProps } from "solid-js";
import { Button as KButton } from "@kobalte/core/button";
import { tv } from "tailwind-variants";
import Loader from "lucide-solid/icons/loader";
const button = tv({
    base: "btn",
    variants: {
        appearance: {
            primary: "btn-primary",
            secondary: "btn-secondary",
            success: "btn-success",
            warning: "btn-warning",
            neutral: "btn-neutral",
            error: "btn-error",
            accent: "btn-accent",
            info: "btn-info",
        },
        size: {
            xs: "btn-xs",
            sm: "btn-sm",
            md: "btn-md",
            lg: "btn-lg",
            xl: "btn-xl",
        },
        variant: {
            outline: "btn-outline",
            dash: "btn-dash",
            soft: "btn-soft",
            ghost: "btn-ghost",
            link: "btn-link",
            none: "",
        },
        modifier: {
            wide: "btn-wide",
            block: "btn-block",
            square: "btn-square",
            circle: "btn-circle",
            none: "",
        },
    },
    defaultVariants: {
        variant: "none",
        appearance: "neutral",
        size: "md",
        modifier: "none",
    },
});
const spinnerSizeMap = {
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 28,
};
export const Button = (props) => {
    const [local, others] = splitProps(props, [
        "children",
        "class",
        "variant",
        "appearance",
        "size",
        "isLoading",
        "modifier",
    ]);
    const classes = createMemo(() => button({
        variant: local.variant,
        appearance: local.appearance,
        size: local.size,
        modifier: local.modifier,
        class: local.class,
    }));
    return (<KButton class={classes()} disabled={local.isLoading} {...others}>
      {local.children}
      <Show when={local.isLoading}>
        <Loader class="ml-1 animate-spin" size={spinnerSizeMap[local.size ?? "md"]}/>
      </Show>
    </KButton>);
};
export default Button;
