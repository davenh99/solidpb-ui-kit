import type { Component, JSX } from "solid-js";
export interface ImageProps extends Omit<JSX.ImgHTMLAttributes<HTMLImageElement>, "onChange"> {
    editable?: boolean;
    onChange?: (file: File) => void;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    label?: string;
}
export declare const Image: Component<ImageProps>;
