import { splitProps, createMemo } from "solid-js";
import { Dynamic } from "solid-js/web";
import { tv } from "tailwind-variants";
const heading = tv({
    base: "font-sans text-balance tracking-tight",
    variants: {
        appearance: {
            h1: "text-4xl font-bold",
            h2: "text-3xl font-semibold",
            h3: "text-2xl font-semibold",
            h4: "text-xl font-medium",
            h5: "text-lg font-medium",
            h6: "text-base font-medium",
            p: "text-base font-normal",
        },
    },
    defaultVariants: {
        appearance: "p",
    },
});
export const Heading = (props) => {
    const [local, others] = splitProps(props, ["as", "appearance", "class", "children"]);
    const Tag = (local.as ?? "p");
    const classes = createMemo(() => heading({ appearance: local.appearance ?? local.as ?? "p", class: local.class }));
    return (<Dynamic component={Tag} class={classes()} {...others}>
      {local.children}
    </Dynamic>);
};
export default Heading;
