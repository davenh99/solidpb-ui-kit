import { JSX, JSXElement } from "solid-js";
export interface RelationPickerProps<T> {
    value: T | T[] | null;
    options: T[];
    onChange: (val: T | T[] | null) => void;
    labelKey: keyof T;
    valueKey: keyof T;
    disabledKey?: keyof T;
    multi?: boolean;
    label?: string;
    variant?: "ghost";
    appearance?: "neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error";
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    disabled?: boolean;
    placeholder?: string;
    class?: string;
    listboxAction?: JSXElement;
    onTextInputChange?: (text: string) => void;
    defaultFilter?: (option: T[] | Exclude<NonNullable<T>, null>, filter: string) => boolean;
    onLinkClick?: (value: T) => void;
    href?: string;
    onCreateInline?: (text: string) => Promise<T | undefined>;
}
export declare const RelationPicker: <T extends object>(props: RelationPickerProps<T>) => JSX.Element;
export default RelationPicker;
