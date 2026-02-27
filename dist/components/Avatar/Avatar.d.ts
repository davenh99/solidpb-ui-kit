import { Component } from "solid-js";
interface AvatarProps {
    src?: string;
    alt?: string;
    class?: string;
    fallback?: string;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
}
export declare const Avatar: Component<AvatarProps>;
export default Avatar;
