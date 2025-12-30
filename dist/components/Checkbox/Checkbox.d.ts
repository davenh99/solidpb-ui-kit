import { Component, ValidComponent } from "solid-js";
import { CheckboxRootProps } from "@kobalte/core/checkbox";
import { PolymorphicProps } from "@kobalte/core";
type CheckBoxProps<T extends ValidComponent = "div"> = PolymorphicProps<T, CheckboxRootProps<T>>;
interface Props extends CheckBoxProps {
    label?: string;
    saveFunc?: (v: boolean) => Promise<void>;
}
export declare const Checkbox: Component<Props>;
export default Checkbox;
