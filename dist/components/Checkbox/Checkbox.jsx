import { createMemo, Show } from "solid-js";
import { Checkbox as KCheckbox } from "@kobalte/core/checkbox";
import Check from "lucide-solid/icons/check";
import { debounce } from "../../methods/debounce";
export const Checkbox = (props) => {
    const debouncedSave = createMemo(() => (props.saveFunc ? debounce(props.saveFunc) : undefined));
    const handleChange = (v) => {
        props.onChange?.(v);
        debouncedSave()?.(v);
    };
    return (<KCheckbox checked={props.checked} onChange={handleChange} class="flex flex-row space-x-2 items-center">
      <KCheckbox.Input />
      <KCheckbox.Control class="h-5 w-5 rounded-sm border-2 border-[var(--color-light-muted)] dark:border-[var(--color-dark-muted)] bg-[var(--color-light-surface)] dark:bg-[var(--color-dark-surface)] data-[checked]:bg-[var(--color-light-primary)] dark:data-[checked]:bg-[var(--color-dark-primary)] transition-colors">
        <KCheckbox.Indicator class="text-[var(--color-light-surface)] dark:text-[var(--color-dark-surface)]">
          <Check />
        </KCheckbox.Indicator>
      </KCheckbox.Control>
      <Show when={props.label}>
        <KCheckbox.Label class="text-[var(--color-text-light-primary)] dark:text-[var(--color-text-dark-primary)]">
          {props.label}
        </KCheckbox.Label>
      </Show>
    </KCheckbox>);
};
export default Checkbox;
