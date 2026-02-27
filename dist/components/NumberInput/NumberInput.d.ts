import { Component, ValidComponent } from "solid-js";
import { type NumberFieldInputProps, type NumberFieldRootProps } from "@kobalte/core/number-field";
import type { PolymorphicProps } from "@kobalte/core";
export type NumberInputProps<T extends ValidComponent = "input"> = PolymorphicProps<T, NumberFieldInputProps<T>>;
export interface NumberInputExtraProps {
    label?: string;
    variant?: "ghost";
    appearance?: "neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error";
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    inputProps?: NumberInputProps;
    saveFunc?: (v: number) => Promise<any>;
}
export type NumberInputRootProps<T extends ValidComponent = "div"> = NumberInputExtraProps & PolymorphicProps<T, NumberFieldRootProps<T>>;
export declare const NumberInput: Component<NumberInputRootProps>;
export default NumberInput;
