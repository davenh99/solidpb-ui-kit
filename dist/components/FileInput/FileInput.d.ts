import { Component, JSX } from "solid-js";
export interface FileInputProps extends Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
    label?: string;
    onChange?: (files: FileList | null) => void;
    accept?: string;
    multiple?: boolean;
    class?: string;
    variant?: "ghost";
    appearance?: "primary" | "secondary" | "success" | "warning" | "neutral" | "error" | "accent" | "info";
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    saveFunc?: (files: FileList | null) => Promise<void>;
}
export declare const FileInput: Component<FileInputProps>;
export default FileInput;
