import { Component, ValidComponent } from "solid-js";
import { type TextFieldInputProps, type TextFieldRootProps } from "@kobalte/core/text-field";
import type { PolymorphicProps } from "@kobalte/core";
export type InputProps<T extends ValidComponent = "input"> = PolymorphicProps<T, TextFieldInputProps<T>>;
export interface ExtraProps {
    label?: string;
    variant?: "ghost";
    appearance?: "neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error";
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    inputProps?: InputProps;
    saveFunc?: (v: string) => Promise<any>;
}
export type InputRootProps<T extends ValidComponent = "div"> = ExtraProps & PolymorphicProps<T, TextFieldRootProps<T>>;
export declare const Input: Component<InputRootProps>;
export default Input;
