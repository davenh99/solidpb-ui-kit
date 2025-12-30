import { Component, JSX } from "solid-js";
interface TextProps {
    children: JSX.Element;
    size?: "sm" | "md" | "lg";
    color?: "primary" | "secondary" | "error" | "success" | "warning" | "muted";
    class?: string;
}
export declare const Text: Component<TextProps>;
export default Text;
