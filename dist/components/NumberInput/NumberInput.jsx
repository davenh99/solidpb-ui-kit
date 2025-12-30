import { createMemo, Show, splitProps } from "solid-js";
import { NumberField, } from "@kobalte/core/number-field";
import { debounce } from "../../methods/debounce";
import { tv } from "tailwind-variants";
const inputRoot = tv({ base: "flex flex-row items-center space-x-1" });
const inputField = tv({ base: "input outline-none text-right my-0" });
export const NumberInput = (props) => {
    const [local, others] = splitProps(props, ["label", "class", "inputProps", "saveFunc"]);
    const debouncedSave = createMemo(() => (local.saveFunc ? debounce(local.saveFunc) : undefined));
    const handleChange = (v) => {
        debouncedSave()?.(Number(v));
    };
    return (<NumberField {...others} onChange={handleChange} class={inputRoot({ class: local.class })}>
      <Show when={local.label}>
        <NumberField.Label>{local.label}</NumberField.Label>
      </Show>
      <NumberField.Input {...local.inputProps} class={inputField({ class: local.inputProps?.class ?? "" })}/>
    </NumberField>);
};
export default NumberInput;
