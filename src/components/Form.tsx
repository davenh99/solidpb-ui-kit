import { JSXElement, splitProps } from "solid-js";
import { createStore } from "solid-js/store";
import { tv } from "tailwind-variants";

import { InternalFormContext, useInternalFormContext } from "./formContext";
import { Switch, type SwitchProps } from "./Switch";
import { Select, type SelectProps } from "./Select";
import { Input, type InputRootProps } from "./Input";
import { TextArea, type TextAreaRootProps } from "./TextArea";
import { Checkbox, type CheckboxProps } from "./Checkbox";
import { NumberInput, type NumberInputRootProps } from "./NumberInput";
import { Slider, type SliderProps } from "./Slider";
import { Image, type ImageProps } from "./Image";
import { Button } from "./Button";
import { FileInput, type FileInputProps } from "./FileInput";
import RelationPicker, { RelationPickerProps } from "./RelationPicker";

export interface FormProps<T> {
  data: Partial<T>;
  title?: string;
  onSave?: (values: Partial<T>) => Promise<void>;
  onCancel?: () => void;
  children: JSXElement;
  class?: string;
}

type BaseFieldProps<T> = {
  field: keyof T;
};

const formClass = tv({
  base: "space-y-4 space-x-4",
});

export function createForm<T>() {
  type Ctx = {
    setValue<K extends keyof T>(key: K, value: T[K]): void;
    getValue<K extends keyof T>(key: K): T[K] | undefined;
  };

  const Form = (props: FormProps<T>): JSXElement => {
    const [values, setValues] = createStore<Partial<T>>({ ...props.data });

    const setValue = <K extends keyof T>(key: K, value: T[K]) => {
      console.log("Setting value", key, value);
      setValues(key as any, value as any);
    };

    const getValue = <K extends keyof T>(key: K): T[K] | undefined => {
      return values[key];
    };

    const contextValue: Ctx = { setValue, getValue };

    const handleSubmit = (e: any) => {
      e.preventDefault();
      props.onSave?.(values);
    };

    return (
      <InternalFormContext.Provider value={contextValue}>
        <form onSubmit={handleSubmit} class={formClass({ class: props.class })}>
          {props.title && <h2 class="text-lg font-semibold">{props.title}</h2>}

          {props.children}

          <div class="flex justify-end gap-2">
            {props.onCancel && (
              <Button appearance="neutral" onClick={props.onCancel}>
                Cancel
              </Button>
            )}
            {props.onSave && (
              <Button appearance="success" type="submit">
                Save
              </Button>
            )}
          </div>
        </form>
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

  const SelectField = (props: SelectProps<{ label: string; value: string }> & BaseFieldProps<T>) => {
    const [local, others] = splitProps(props, ["onChange", "value"]);
    const form = useInternalFormContext() as Ctx;

    return (
      <Select
        {...others}
        labelKey="label"
        valueKey="value"
        value={local.value}
        onChange={(v) => {
          local.onChange(v);
          form.setValue(props.field, v?.value as any);
        }}
      />
    );
  };

  const FileField = (props: FileInputProps & BaseFieldProps<T>) => {
    const form = useInternalFormContext() as Ctx;

    return <FileInput {...props} onChange={(files) => form.setValue(props.field, files as any)} />;
  };

  const ImageField = (props: ImageProps & BaseFieldProps<T>) => {
    const form = useInternalFormContext() as Ctx;
    const [local, others] = splitProps(props, ["onChange"]);

    // have to set src manually, when using with pocketbase, the value will be a URL string,
    // but when uploading a new file it will be a File object, so we need to handle both cases

    return (
      <Image
        editable
        {...others}
        onChange={(file) => {
          form.setValue(props.field, file as any);
          local.onChange?.(file);
        }}
      />
    );
  };

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

  const RelationField = <K extends { id: string }>(props: RelationPickerProps<K> & BaseFieldProps<T>) => {
    const form = useInternalFormContext() as Ctx;
    const [local, others] = splitProps(props, ["onChange"]);

    const handleChange = (val: K | K[] | null) => {
      if (props.multi) {
        form.setValue(props.field, (Array.isArray(val) ? val.map((v) => v.id) : []) as any);
      } else {
        form.setValue(props.field, ((val as K)?.id || null) as any);
      }
      local.onChange?.(val);
    };

    return <RelationPicker<K> {...others} onChange={handleChange} />;
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
  Form.RelationField = RelationField;

  return Form;
}
