import { Component } from "solid-js";
interface SearchInputProps {
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
    class?: string;
}
export declare const SearchInput: Component<SearchInputProps>;
export default SearchInput;
