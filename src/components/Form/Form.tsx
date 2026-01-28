import { JSXElement } from "solid-js";
import { createStore } from "solid-js/store";

import { Switch, SwitchProps } from "../Switch";
import { Select, SelectProps } from "../Select";
import { Input, InputRootProps } from "../Input";
import { TextArea, TextAreaRootProps } from "../TextArea";
import { Checkbox, CheckboxProps } from "../Checkbox";
import { InternalFormContext, useInternalFormContext } from "./formContext";
import { NumberInputRootProps, NumberInput } from "../NumberInput";
import { Button } from "../Button";
import Slider, { SliderProps } from "../Slider/Slider";

export interface FormProps<T> {
  data: T;
  title?: string;
  onSave?: (values: Partial<T>) => Promise<void>;
  onCancel?: () => void;
  children: JSXElement;
}

type BaseFieldProps<T> = {
  field: keyof T;
};

export function createForm<T>() {
  type Ctx = {
    setValue<K extends keyof T>(key: K, value: T[K]): void;
    getValue<K extends keyof T>(key: K): T[K] | undefined;
    values: Partial<T>;
  };

  const Form = (props: FormProps<T>): JSXElement => {
    const [values, setValues] = createStore<Partial<T>>({ ...props.data });

    const setValue = <K extends keyof T>(key: K, value: T[K]) => {
      setValues(key as any, value as any);
    };

    const getValue = <K extends keyof T>(key: K): T[K] | undefined => {
      return values[key];
    };

    const contextValue: Ctx = { setValue, getValue, values };

    return (
      <InternalFormContext.Provider value={contextValue}>
        <div class="space-y-4">
          {props.title && <h2 class="text-lg font-semibold">{props.title}</h2>}

          {props.children}

          <div class="flex justify-end gap-2">
            <Button appearance="neutral" onClick={props.onCancel} size="sm">
              Cancel
            </Button>
            {props.onSave && (
              <Button appearance="success" onClick={() => props.onSave?.(values)} size="sm">
                Save
              </Button>
            )}
          </div>
        </div>
      </InternalFormContext.Provider>
    );
  };

  const TextField = (props: InputRootProps & BaseFieldProps<T>) => {
    const form = useInternalFormContext() as Ctx;

    return (
      <Input
        {...props}
        value={form.getValue(props.field) as any}
        onChange={(v) => form.setValue(props.field, v as any)}
      />
    );
  };

  const NumberField = (props: NumberInputRootProps & BaseFieldProps<T>) => {
    const form = useInternalFormContext() as Ctx;

    return (
      <NumberInput
        {...props}
        rawValue={form.getValue(props.field) as any}
        onRawValueChange={(v) => form.setValue(props.field, v as any)}
      />
    );
  };

  const CheckboxField = (props: CheckboxProps & BaseFieldProps<T>) => {
    const form = useInternalFormContext() as Ctx;

    return (
      <Checkbox
        {...props}
        checked={Boolean(form.getValue(props.field))}
        onChange={(v) => form.setValue(props.field, v as any)}
      />
    );
  };

  const SwitchField = (props: SwitchProps & BaseFieldProps<T>) => {
    const form = useInternalFormContext() as Ctx;

    return (
      <Switch
        {...props}
        checked={Boolean(form.getValue(props.field) as any)}
        onChange={(v) => form.setValue(props.field, v as any)}
      />
    );
  };

  const TextAreaField = (props: TextAreaRootProps & BaseFieldProps<T>) => {
    const form = useInternalFormContext() as Ctx;

    return (
      <TextArea
        {...props}
        value={form.getValue(props.field) as any}
        onChange={(v) => form.setValue(props.field, v as any)}
      />
    );
  };

  const SelectField = (props: SelectProps & BaseFieldProps<T>) => {
    const form = useInternalFormContext() as Ctx;

    return (
      <Select
        {...props}
        value={form.getValue(props.field) as any}
        onChange={(v) => form.setValue(props.field, v as any)}
      />
    );
  };

  const FileField = () => {};

  const ImageField = () => {};

  const SliderField = (props: SliderProps & BaseFieldProps<T>) => {
    const form = useInternalFormContext() as Ctx;

    return (
      <Slider
        {...props}
        value={form.getValue(props.field) as any}
        onChange={(v) => form.setValue(props.field, v as any)}
      />
    );
  };

  Form.TextField = TextField;
  Form.NumberField = NumberField;
  Form.CheckboxField = CheckboxField;
  Form.SwitchField = SwitchField;
  Form.TextAreaField = TextAreaField;
  Form.SelectField = SelectField;
  Form.FileField = FileField;
  Form.ImageField = ImageField;
  Form.SliderField = SliderField;

  return Form;
}
