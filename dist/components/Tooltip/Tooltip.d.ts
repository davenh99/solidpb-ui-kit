import { Component, JSXElement } from "solid-js";
interface TooltipProps {
    content: JSXElement;
    children: JSXElement;
    class?: string;
    appearance?: "neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error";
}
export declare const Tooltip: Component<TooltipProps>;
export default Tooltip;
