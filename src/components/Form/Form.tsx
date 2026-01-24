import { createSignal, JSXElement, onMount } from "solid-js";

import { Switch } from "../Switch";
import { FormContext, useForm } from "./formContext";

interface FormProps<T> {
  data: T;
  title?: string;
  saveFunc?: (values: Partial<T>) => Promise<void>;
  children: JSXElement;
}

export const Form = <T,>(props: FormProps<T>): JSXElement => {
  const [values, setValues] = createSignal<Partial<T>>(props.data);

  const register = <K extends keyof T>(key: K, initialValue: T[K] | undefined) => {
    setValues((v) => (key in v ? v : { ...v, [key]: initialValue }));
  };

  const setValue = <K extends keyof T>(key: K, value: T[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
  };

  const getValue = <K extends keyof T>(key: K): T[K] | undefined => {
    return values()[key];
  };

  const save = async () => {
    if (props.saveFunc) {
      await props.saveFunc(values());
    }
  };

  return (
    <FormContext.Provider value={{ register, setValue, getValue, values }}>
      <div class="space-y-4">
        {props.title && <h2 class="text-lg font-semibold">{props.title}</h2>}

        {props.children}

        {props.saveFunc && (
          <button class="btn btn-primary" onClick={save}>
            Save
          </button>
        )}
      </div>
    </FormContext.Provider>
  );
};

export type FormWidget = "text" | "number" | "checkbox" | "switch" | "multilinetext" | "select";
export interface WidgetProps<T> {
  value: T | undefined;
  setValue: (v: T) => void;
}
type WidgetComponent<T> = (props: WidgetProps<T>) => JSXElement;

export const widgets: Record<FormWidget, WidgetComponent<any>> = {
  text: ({ value, setValue }) => (
    <input
      class="input input-bordered w-full"
      value={value ?? ""}
      onInput={(e) => setValue(e.currentTarget.value)}
    />
  ),

  number: ({ value, setValue }) => (
    <input
      type="number"
      class="input input-bordered w-full"
      value={value ?? ""}
      onInput={(e) => setValue(Number(e.currentTarget.value))}
    />
  ),

  checkbox: ({ value, setValue }) => (
    <input type="checkbox" checked={Boolean(value)} onChange={(e) => setValue(e.currentTarget.checked)} />
  ),

  switch: ({ value, setValue }) => <Switch checked={Boolean(value)} onChange={setValue} />,

  textarea: ({ value, setValue }) => (
    <textarea
      class="textarea textarea-bordered w-full"
      value={value ?? ""}
      onInput={(e) => setValue(e.currentTarget.value)}
    />
  ),

  select: ({ value, setValue }) => <Select value={value} onChange={setValue} options={[]} />,
};

interface FormFieldProps<T, K extends keyof T> {
  field: K;
  label: string;
  initialValue?: T[K];
  widget: FormWidget;
}

export const FormField = <T, K extends keyof T>(props: FormFieldProps<T, K>) => {
  const form = useForm<T>();

  onMount(() => {
    form.register(props.field, props.initialValue);
  });

  return (
    <div class="space-y-1">
      <label class="text-sm font-medium">{props.label}</label>
      {props.children(form.getValue(props.field), (v) => form.setValue(props.field, v))}
    </div>
  );
};

Form.Field = FormField;

export default Form;
