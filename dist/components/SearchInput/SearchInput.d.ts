import { Component } from "solid-js";
interface SearchInputProps {
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
    class?: string;
    variant?: "ghost";
    appearance?: "neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error";
    size?: "xs" | "sm" | "md" | "lg" | "xl";
}
export declare const SearchInput: Component<SearchInputProps>;
export default SearchInput;
