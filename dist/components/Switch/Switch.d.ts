import { Component, JSX } from "solid-js";
export interface SwitchProps extends Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
    label?: string;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    appearance?: "primary" | "secondary" | "success" | "warning" | "error" | "info" | "accent" | "neutral";
    onChange?: (checked: boolean) => void;
}
export declare const Switch: Component<SwitchProps>;
export default Switch;
