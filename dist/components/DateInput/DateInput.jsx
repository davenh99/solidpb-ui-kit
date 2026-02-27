import { Show } from "solid-js";
import { tv } from "tailwind-variants";
const dateInput = tv({
    base: "input outline-offset-0",
    variants: {
        variant: {
            ghost: "input-ghost",
            none: "",
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
        size: {
            xs: "input-xs",
            sm: "input-sm",
            md: "input-md",
            lg: "input-lg",
            xl: "input-xl",
        },
    },
});
export const DateInput = (props) => {
    // yyyy-mm-dd for input value
    const valueStr = () => (props.value ? props.value.toISOString().slice(0, 10) : "");
    const handleChange = (e) => {
        const val = e.target.value;
        props.onChange(val ? new Date(val) : null);
    };
    return (<label class="floating-label">
      <Show when={props.label}>
        <span>{props.label}</span>
      </Show>
      <input type="date" class={dateInput({ size: props.size, variant: props.variant, appearance: props.appearance })} value={valueStr()} onInput={handleChange} min={props.min} max={props.max}/>
    </label>);
};
export default DateInput;
