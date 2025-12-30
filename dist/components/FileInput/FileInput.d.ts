import { Component } from "solid-js";
interface FileInputProps {
    label?: string;
    onChange: (files: FileList | null) => void;
    accept?: string;
    multiple?: boolean;
    class?: string;
}
export declare const FileInput: Component<FileInputProps>;
export default FileInput;
