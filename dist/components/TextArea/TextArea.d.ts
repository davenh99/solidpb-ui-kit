import { Component, ValidComponent } from "solid-js";
import { type TextFieldTextAreaProps, type TextFieldRootProps } from "@kobalte/core/text-field";
import type { PolymorphicProps } from "@kobalte/core";
export type TextAreaProps<T extends ValidComponent = "textarea"> = PolymorphicProps<T, TextFieldTextAreaProps<T>>;
export interface TextAreaExtraProps {
    label?: string;
    saveFunc?: (v: string) => Promise<any>;
    textareaProps?: TextAreaProps;
    variant?: "ghost";
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    appearance?: "primary" | "secondary" | "success" | "warning" | "neutral" | "error" | "accent" | "info";
}
export type TextAreaRootProps<T extends ValidComponent = "div"> = TextAreaExtraProps & PolymorphicProps<T, TextFieldRootProps<T>>;
export declare const TextArea: Component<TextAreaRootProps>;
export default TextArea;
