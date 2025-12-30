import { Component } from "solid-js";
interface DateInputProps {
    label?: string;
    value: Date | null;
    onChange: (date: Date | null) => void;
    class?: string;
}
export declare const DateInput: Component<DateInputProps>;
export default DateInput;
