import { Switch as KSwitch } from "@kobalte/core/switch";
import { createMemo, Show } from "solid-js";
import { debounce } from "../../methods/debounce";
export const Switch = (props) => {
    const debouncedSave = createMemo(() => (props.saveFunc ? debounce(props.saveFunc) : undefined));
    const handleChange = (v) => {
        props.onChange?.(v);
        debouncedSave()?.(v);
    };
    return (<KSwitch class={`flex flex-row justify-between items-center ${props.class ?? ""}`} checked={props.checked} onChange={handleChange}>
      <Show when={props.label}>
        <KSwitch.Label>{props.label}</KSwitch.Label>
      </Show>
      <KSwitch.Input />
      <KSwitch.Control class={`flex items-center w-10 h-6 bg-black rounded-full border-1 border-black
        data-[checked]:bg-white data-[checked]:border-white transition-all`}>
        <KSwitch.Thumb class={`h-5 w-5 rounded-full bg-white transition-transform 
            data-[checked]:[transform:translateX(calc(100%-2px))]`}/>
      </KSwitch.Control>
    </KSwitch>);
};
export default Switch;
