import { Component, JSXElement } from "solid-js";
export interface ThemeOption {
    value: string;
    label: JSXElement;
}
interface ThemeSwitchProps {
    triggerClass?: string;
    options: ThemeOption[];
}
export declare const ThemeSwitch: Component<ThemeSwitchProps>;
export default ThemeSwitch;
