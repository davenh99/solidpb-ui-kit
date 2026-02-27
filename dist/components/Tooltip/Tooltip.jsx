import { tv } from "tailwind-variants";
const tooltip = tv({
    base: "tooltip tooltip-bottom",
    variants: {
        appearance: {
            neutral: "tooltip-neutral",
            primary: "tooltip-primary",
            secondary: "tooltip-secondary",
            accent: "tooltip-accent",
            info: "tooltip-info",
            success: "tooltip-success",
            warning: "tooltip-warning",
            error: "tooltip-error",
        },
    },
});
export const Tooltip = (props) => {
    return (<div class={tooltip({ class: props.class, appearance: props.appearance })}>
      {props.children}
      <div class="tooltip-content">{props.content}</div>
    </div>);
};
export default Tooltip;
