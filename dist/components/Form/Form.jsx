import { splitProps } from "solid-js";
import { createStore } from "solid-js/store";
import { InternalFormContext, useInternalFormContext } from "./formContext";
import { Switch } from "../Switch";
import { Select } from "../Select";
import { Input } from "../Input";
import { TextArea } from "../TextArea";
import { Checkbox } from "../Checkbox";
import { NumberInput } from "../NumberInput";
import { Slider } from "../Slider";
import { Image } from "../Image";
import { Button } from "../Button";
import { FileInput } from "../FileInput";
export function createForm() {
    const Form = (props) => {
        const [values, setValues] = createStore({ ...props.data });
        const setValue = (key, value) => {
            setValues(key, value);
        };
        const getValue = (key) => {
            return values[key];
        };
        const contextValue = { setValue, getValue, values };
        const handleSubmit = (e) => {
            e.preventDefault();
            props.onSave?.(values);
        };
        return (<InternalFormContext.Provider value={contextValue}>
        <form onSubmit={handleSubmit} class="space-y-4 space-x-4">
          {props.title && <h2 class="text-lg font-semibold">{props.title}</h2>}

          {props.children}

          <div class="flex justify-end gap-2">
            {props.onCancel && (<Button appearance="neutral" onClick={props.onCancel} size="sm">
                Cancel
              </Button>)}
            {props.onSave && (<Button appearance="success" type="submit" size="sm">
                Save
              </Button>)}
          </div>
        </form>
      </InternalFormContext.Provider>);
    };
    const TextField = (props) => {
        const form = useInternalFormContext();
        return (<Input {...props} value={form.getValue(props.field)} onChange={(v) => form.setValue(props.field, v)}/>);
    };
    const NumberField = (props) => {
        const form = useInternalFormContext();
        return (<NumberInput {...props} rawValue={form.getValue(props.field)} onRawValueChange={(v) => form.setValue(props.field, v)}/>);
    };
    const CheckboxField = (props) => {
        const form = useInternalFormContext();
        return (<Checkbox {...props} checked={Boolean(form.getValue(props.field))} onChange={(v) => form.setValue(props.field, v)}/>);
    };
    const SwitchField = (props) => {
        const form = useInternalFormContext();
        return (<Switch {...props} checked={Boolean(form.getValue(props.field))} onChange={(v) => form.setValue(props.field, v)}/>);
    };
    const TextAreaField = (props) => {
        const form = useInternalFormContext();
        return (<TextArea {...props} value={form.getValue(props.field)} onChange={(v) => form.setValue(props.field, v)}/>);
    };
    const SelectField = (props) => {
        const [local, others] = splitProps(props, ["onChange", "value"]);
        const form = useInternalFormContext();
        return (<Select {...others} labelKey="label" valueKey="value" value={local.value} onChange={(v) => {
                local.onChange(v);
                form.setValue(props.field, v?.value);
            }}/>);
    };
    const FileField = (props) => {
        const form = useInternalFormContext();
        return <FileInput {...props} onChange={(files) => form.setValue(props.field, files)}/>;
    };
    const ImageField = (props) => {
        const form = useInternalFormContext();
        return (<Image {...props} editable src={form.getValue(props.field)} onChange={(file) => {
                const fileURL = URL.createObjectURL(file);
                form.setValue(props.field, fileURL);
            }}/>);
    };
    const SliderField = (props) => {
        const form = useInternalFormContext();
        return (<Slider {...props} value={form.getValue(props.field)} onChange={(v) => form.setValue(props.field, v)}/>);
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
