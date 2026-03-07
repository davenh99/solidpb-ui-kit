import { tv } from "tailwind-variants";
const container = tv({
    base: "flex-1 bg-base-100 min-h-[calc(100vh-4rem)] py-4 px-[2vw]",
});
export const Container = (props) => {
    const classes = container({ class: props.class });
    return <div class={classes}>{props.children}</div>;
};
export default Container;
