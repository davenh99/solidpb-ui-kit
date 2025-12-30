import { Component } from "solid-js";
import { ToastRootProps } from "@kobalte/core/toast";
interface Props extends ToastRootProps {
    title: string;
    msg: string;
    variant?: "error" | "neutral";
}
export declare const Toast: Component<Props>;
export default Toast;
