import { Component } from "solid-js";
export interface TagProps {
    title: string;
    colorHex?: string;
    onDelete?: () => void;
    variant?: "ghost" | "outline" | "dash" | "soft";
    appearance?: "neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error";
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    class?: string;
}
export declare const Tag: Component<TagProps>;
export default Tag;
