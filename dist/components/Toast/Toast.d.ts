import { Component } from "solid-js";
import { ToastRootProps } from "@kobalte/core/toast";
interface Props extends ToastRootProps {
    title: string;
    msg: string;
    appearance?: "primary" | "secondary" | "success" | "warning" | "error" | "neutral" | "info" | "accent";
}
export declare const Toast: Component<Props>;
export default Toast;
