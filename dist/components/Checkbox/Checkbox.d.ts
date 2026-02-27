import { Component, JSX } from "solid-js";
export interface CheckboxProps extends Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
    label?: string;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    appearance?: "primary" | "secondary" | "success" | "warning" | "error" | "info" | "accent" | "neutral";
    onChange?: (checked: boolean) => void;
}
export declare const Checkbox: Component<CheckboxProps>;
export default Checkbox;
