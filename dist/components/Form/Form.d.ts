import { JSXElement } from "solid-js";
import { type SwitchProps } from "../Switch";
import { type SelectProps } from "../Select";
import { type InputRootProps } from "../Input";
import { type TextAreaRootProps } from "../TextArea";
import { type CheckboxProps } from "../Checkbox";
import { type NumberInputRootProps } from "../NumberInput";
import { type SliderProps } from "../Slider";
import { type ImageProps } from "../Image";
import { type FileInputProps } from "../FileInput";
export interface FormProps<T> {
    data: T;
    title?: string;
    onSave?: (values: Partial<T>) => Promise<void>;
    onCancel?: () => void;
    children: JSXElement;
    class?: string;
}
type BaseFieldProps<T> = {
    field: keyof T;
};
export declare function createForm<T>(): {
    (props: FormProps<T>): JSXElement;
    TextField: (props: InputRootProps & BaseFieldProps<T>) => import("solid-js").JSX.Element;
    NumberField: (props: NumberInputRootProps & BaseFieldProps<T>) => import("solid-js").JSX.Element;
    CheckboxField: (props: CheckboxProps & BaseFieldProps<T>) => import("solid-js").JSX.Element;
    SwitchField: (props: SwitchProps & BaseFieldProps<T>) => import("solid-js").JSX.Element;
    TextAreaField: (props: TextAreaRootProps & BaseFieldProps<T>) => import("solid-js").JSX.Element;
    SelectField: (props: SelectProps<{
        label: string;
        value: string;
    }> & BaseFieldProps<T>) => import("solid-js").JSX.Element;
    FileField: (props: FileInputProps & BaseFieldProps<T>) => import("solid-js").JSX.Element;
    ImageField: (props: ImageProps & BaseFieldProps<T>) => import("solid-js").JSX.Element;
    SliderField: (props: SliderProps & BaseFieldProps<T>) => import("solid-js").JSX.Element;
};
export {};
