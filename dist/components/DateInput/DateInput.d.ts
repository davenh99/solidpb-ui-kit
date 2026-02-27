import { Component } from "solid-js";
interface DateInputProps {
    label?: string;
    value: Date | null;
    onChange: (date: Date | null) => void;
    variant?: "ghost";
    appearance?: "neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error";
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    class?: string;
    min?: string;
    max?: string;
}
export declare const DateInput: Component<DateInputProps>;
export default DateInput;
