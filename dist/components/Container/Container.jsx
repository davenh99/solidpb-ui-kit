export const Container = (props) => {
    const classes = `flex-1 ${props.noPadding ? "" : "py-4 px-[3vw]"} ${props.class ?? ""}`;
    return <div class={classes}>{props.children}</div>;
};
export default Container;
