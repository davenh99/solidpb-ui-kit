import { Component } from "solid-js";
interface Option {
    label: string;
    value: string;
}
interface SelectProps {
    label?: string;
    options: Option[];
    value: string;
    onChange: (value: string | null) => void;
    placeholder?: string;
    class?: string;
}
export declare const Select: Component<SelectProps>;
export default Select;
