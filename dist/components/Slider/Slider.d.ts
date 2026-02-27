import { Component } from "solid-js";
export interface SliderProps {
    value?: number;
    min: number;
    max: number;
    step?: number;
    onChange?: (v: number) => void;
    saveFunc?: (v: number) => Promise<any>;
    appearance?: "neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error";
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    class?: string;
    labelClass?: string;
    label?: string;
}
export declare const Slider: Component<SliderProps>;
export default Slider;
