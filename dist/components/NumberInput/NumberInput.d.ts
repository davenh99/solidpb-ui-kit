import { Component, ValidComponent } from "solid-js";
import { type NumberFieldInputProps, type NumberFieldRootProps } from "@kobalte/core/number-field";
import type { PolymorphicProps } from "@kobalte/core";
type InputProps<T extends ValidComponent = "input"> = PolymorphicProps<T, NumberFieldInputProps<T>>;
interface ExtraProps {
    label?: string;
    size?: "sm" | "md";
    inputProps?: InputProps;
    saveFunc?: (v: number) => Promise<any>;
}
type InputRootProps<T extends ValidComponent = "div"> = ExtraProps & PolymorphicProps<T, NumberFieldRootProps<T>>;
export declare const NumberInput: Component<InputRootProps>;
export default NumberInput;
