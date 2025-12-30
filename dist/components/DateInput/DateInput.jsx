import { Show } from "solid-js";
import { tv } from "tailwind-variants";
const dateInput = tv({
    base: "rounded border px-2 py-1 bg-[var(--color-light-surface)] dark:bg-[var(--color-dark-surface)] text-[var(--color-text-light-primary)] dark:text-[var(--color-text-dark-primary)] border-[var(--color-light-muted)] dark:border-[var(--color-dark-muted)]",
});
export const DateInput = (props) => {
    // Convert Date to yyyy-mm-dd string for input value
    const valueStr = () => (props.value ? props.value.toISOString().slice(0, 10) : "");
    const handleChange = (e) => {
        const val = e.target.value;
        props.onChange(val ? new Date(val) : null);
    };
    return (<div class={props.class}>
      <Show when={props.label}>
        <label class="block mb-1 text-xs font-medium text-[var(--color-text-light-secondary)] dark:text-[var(--color-text-dark-secondary)]">
          {props.label}
        </label>
      </Show>
      <input type="date" class={dateInput()} value={valueStr()} onInput={handleChange}/>
    </div>);
};
export default DateInput;
