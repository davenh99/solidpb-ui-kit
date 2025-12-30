import { ParentComponent, ValidComponent } from "solid-js";
import { ButtonRootProps } from "@kobalte/core/button";
import { PolymorphicProps } from "@kobalte/core/polymorphic";
type BaseProps<T extends ValidComponent = "button"> = PolymorphicProps<T, ButtonRootProps<T>>;
interface Props extends BaseProps {
    variant?: "text" | "solid";
    appearance?: "primary" | "success" | "warning" | "neutral" | "error" | "muted";
    size?: "xs" | "sm" | "md" | "lg";
    isLoading?: boolean;
}
export declare const Button: ParentComponent<Props>;
export default Button;
