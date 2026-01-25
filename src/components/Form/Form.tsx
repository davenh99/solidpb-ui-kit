import { JSXElement } from "solid-js";
import { createStore } from "solid-js/store";
import { Dynamic } from "solid-js/web";

import { Switch } from "../Switch";
import { Select } from "../Select";
import { Input } from "../Input";
import { TextArea } from "../TextArea";
import { Checkbox } from "../Checkbox";
import { InternalFormContext, useInternalFormContext } from "./formContext";
import { NumberInput } from "../NumberInput";
import { Button } from "../Button";

export interface FormProps<T> {
  data: T;
  title?: string;
  saveFunc?: (values: Partial<T>) => Promise<void>;
  children: JSXElement;
}

export type FormWidget = "text" | "number" | "checkbox" | "switch" | "textarea" | "select";

export interface WidgetProps<T> {
  label: string;
  value: T | undefined;
  setValue: (v: T) => void;
  // only for widget "select"
  selectOptions?: { label: string; value: string }[];
}

type WidgetComponent<T> = (props: WidgetProps<T>) => JSXElement;

export const widgets: Record<FormWidget, WidgetComponent<any>> = {
  text: ({ label, value, setValue }) => <Input label={label} value={value()} onChange={setValue} />,

  number: ({ label, value, setValue }) => (
    <NumberInput label={label} rawValue={value()} onRawValueChange={setValue} />
  ),

  checkbox: ({ label, value, setValue }) => (
    <Checkbox label={label} checked={Boolean(value())} onChange={setValue} />
  ),

  switch: ({ label, value, setValue }) => (
    <Switch label={label} checked={Boolean(value())} onChange={setValue} />
  ),

  textarea: ({ label, value, setValue }) => <TextArea label={label} value={value()} onChange={setValue} />,

  select: ({ label, value, setValue, selectOptions }) => (
    <Select label={label} value={value()} onChange={setValue} options={selectOptions || []} />
  ),
};

type BaseFieldProps<T> = {
  field: keyof T;
  label: string;
};

type SelectFieldProps<T> = BaseFieldProps<T> & {
  widget: "select";
  selectOptions: { label: string; value: string }[];
};

type NonSelectFieldProps<T> = BaseFieldProps<T> & {
  widget: Exclude<FormWidget, "select">;
  selectOptions?: never;
};

export type FieldProps<T> = SelectFieldProps<T> | NonSelectFieldProps<T>;

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

    const save = async () => {
      if (props.saveFunc) {
        await props.saveFunc(values);
      }
    };

    const contextValue: Ctx = { setValue, getValue, values };

    return (
      <InternalFormContext.Provider value={contextValue}>
        <div class="space-y-4">
          {props.title && <h2 class="text-lg font-semibold">{props.title}</h2>}

          {props.children}

          {props.saveFunc && (
            <div class="flex justify-end">
              <Button appearance="success" onClick={save} size="sm">
                Save
              </Button>
            </div>
          )}
        </div>
      </InternalFormContext.Provider>
    );
  };

  const Field = (props: FieldProps<T>) => {
    const form = useInternalFormContext() as Ctx;

    return (
      <div class="space-x-2 space-y-2">
        <Dynamic
          component={widgets[props.widget]}
          label={props.label}
          value={() => form.getValue(props.field)}
          setValue={(v) => form.setValue(props.field, v)}
          selectOptions={props.widget === "select" ? props.selectOptions : undefined}
        />
      </div>
    );
  };

  Form.Field = Field;

  return Form;
}
