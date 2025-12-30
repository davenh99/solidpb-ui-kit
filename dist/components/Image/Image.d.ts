import { Component } from "solid-js";
interface ImageProps {
    src: string;
    alt?: string;
    class?: string;
    rounded?: boolean;
}
export declare const Image: Component<ImageProps>;
export default Image;
