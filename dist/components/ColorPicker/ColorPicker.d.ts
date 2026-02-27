interface ColorPickerProps {
    value?: string;
    onChange?: (color: string) => void;
    saveFunc?: (v: string) => Promise<void>;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    label?: string;
    class?: string;
}
export declare function ColorPicker(props: ColorPickerProps): import("solid-js").JSX.Element;
export default ColorPicker;
