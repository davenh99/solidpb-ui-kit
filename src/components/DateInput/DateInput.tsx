import { Component, Show } from "solid-js";
import { tv } from "tailwind-variants";

interface DateInputProps {
  label?: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  class?: string;
}

const dateInput = tv({
  base: "rounded border px-2 py-1 bg-[var(--color-light-surface)] dark:bg-[var(--color-dark-surface)] text-[var(--color-text-light-primary)] dark:text-[var(--color-text-dark-primary)] border-[var(--color-light-muted)] dark:border-[var(--color-dark-muted)]",
});

export const DateInput: Component<DateInputProps> = (props) => {
  // Convert Date to yyyy-mm-dd string for input value
  const valueStr = () => (props.value ? props.value.toISOString().slice(0, 10) : "");
  const handleChange = (e: Event) => {
    const val = (e.target as HTMLInputElement).value;
    props.onChange(val ? new Date(val) : null);
  };
  return (
    <div class={props.class}>
      <Show when={props.label}>
        <label class="block mb-1 text-xs font-medium">{props.label}</label>
      </Show>
      <input type="date" class={dateInput()} value={valueStr()} onInput={handleChange} />
    </div>
  );
};

export default DateInput;
