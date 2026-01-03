import { ParentComponent, ValidComponent } from "solid-js";
import { ButtonRootProps } from "@kobalte/core/button";
import { PolymorphicProps } from "@kobalte/core/polymorphic";
type BaseProps<T extends ValidComponent = "button"> = PolymorphicProps<T, ButtonRootProps<T>>;
interface Props extends BaseProps {
    variant?: "outline" | "dash" | "soft" | "ghost" | "link";
    appearance?: "primary" | "secondary" | "success" | "warning" | "neutral" | "error" | "accent" | "info";
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    modifier?: "wide" | "block" | "square" | "circle";
    isLoading?: boolean;
}
export declare const Button: ParentComponent<Props>;
export default Button;
