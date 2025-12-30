import { Component, ValidComponent } from "solid-js";
import { type TextFieldInputProps, type TextFieldRootProps } from "@kobalte/core/text-field";
import type { PolymorphicProps } from "@kobalte/core";
type InputProps<T extends ValidComponent = "textarea"> = PolymorphicProps<T, TextFieldInputProps<T>>;
interface ExtraProps {
    label?: string;
    saveFunc?: (v: string) => Promise<any>;
    inputProps?: InputProps;
    variant?: "bordered" | "none";
    size?: "sm" | "md";
}
type InputRootProps<T extends ValidComponent = "div"> = ExtraProps & PolymorphicProps<T, TextFieldRootProps<T>>;
export declare const TextArea: Component<InputRootProps>;
export default TextArea;
