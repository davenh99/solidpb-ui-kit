import { Component, JSX } from "solid-js";
interface TooltipProps {
    content: JSX.Element;
    children: JSX.Element;
    class?: string;
}
export declare const Tooltip: Component<TooltipProps>;
export default Tooltip;
