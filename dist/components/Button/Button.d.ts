import { ParentComponent, ValidComponent } from "solid-js";
import { type ButtonRootProps } from "@kobalte/core/button";
import { PolymorphicProps } from "@kobalte/core/polymorphic";
type BaseProps<T extends ValidComponent = "button"> = PolymorphicProps<T, ButtonRootProps<T>>;
export interface ButtonProps extends BaseProps {
    variant?: "outline" | "dash" | "soft" | "ghost" | "link";
    appearance?: "primary" | "secondary" | "success" | "warning" | "neutral" | "error" | "accent" | "info";
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    modifier?: "wide" | "block" | "square" | "circle";
    isLoading?: boolean;
}
export declare const Button: ParentComponent<ButtonProps>;
export default Button;
