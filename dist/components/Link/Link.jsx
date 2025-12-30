import { splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { tv } from "tailwind-variants";
const link = tv({
    base: "text-[var(--color-light-primary)] dark:text-[var(--color-dark-primary)] hover:underline underline-offset-4 transition",
});
export const Link = (props) => {
    const [local, others] = splitProps(props, ["as", "children", "class"]);
    return (<Dynamic component={local.as ?? "a"} {...others} class={link({ class: local.class })}>
      {local.children}
    </Dynamic>);
};
export default Link;
