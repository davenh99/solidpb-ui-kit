import { splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { tv } from "tailwind-variants";
const link = tv({
    base: "link",
    variants: {
        appearance: {
            neutral: "link-neutral",
            primary: "link-primary",
            secondary: "link-secondary",
            accent: "link-accent",
            info: "link-info",
            success: "link-success",
            warning: "link-warning",
            error: "link-error",
        },
    },
});
export function Link(props) {
    const [local, others] = splitProps(props, ["as", "class", "children"]);
    return (<Dynamic component={local.as ?? "a"} {...others} class={link({ class: local.class, appearance: props.appearance })}>
      {local.children}
    </Dynamic>);
}
export default Link;
