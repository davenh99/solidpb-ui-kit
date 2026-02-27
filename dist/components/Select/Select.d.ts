export interface SelectProps<T> {
    options: T[];
    value: T | null;
    onChange: (val: T | null) => void;
    labelKey?: keyof T;
    valueKey?: keyof T;
    disabledKey?: keyof T;
    label?: string;
    variant?: "ghost";
    appearance?: "neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error";
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    class?: string;
    placeholder?: string;
    disabled?: boolean;
}
export declare const Select: <T>(props: SelectProps<T>) => import("solid-js").JSX.Element;
export default Select;
