import { SwitchRootProps } from "@kobalte/core/switch";
import { Component, ValidComponent } from "solid-js";
import { PolymorphicProps } from "@kobalte/core";
type SwitchProps<T extends ValidComponent = "div"> = PolymorphicProps<T, SwitchRootProps<T>>;
interface Props extends SwitchProps {
    label?: string;
    size?: "sm" | "md";
    saveFunc?: (v: boolean) => Promise<any>;
}
export declare const Switch: Component<Props>;
export default Switch;
