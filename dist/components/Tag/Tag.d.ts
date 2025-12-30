import { Component } from "solid-js";
interface Props {
    onClick: () => void;
    title: string;
    colorHex: string;
    size?: "xs" | "s" | "m";
    class?: string;
}
export declare const Tag: Component<Props>;
export default Tag;
