import { PolymorphicProps } from "@kobalte/core";
import { JSXElement, ValidComponent } from "solid-js";
type LinkProps<T extends ValidComponent = "a"> = PolymorphicProps<T, {
    href?: string;
    disabled?: boolean;
    class?: string;
    appearance?: "neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error";
    children: JSXElement;
}>;
export declare function Link<T extends ValidComponent = "a">(props: LinkProps<T>): import("solid-js").JSX.Element;
export default Link;
