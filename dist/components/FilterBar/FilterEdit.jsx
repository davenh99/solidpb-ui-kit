import { createMemo, createSignal, Match, Show, Switch } from "solid-js";
import X from "lucide-solid/icons/x";
import { filterDefaults, filterLabels, } from "./FilterBar";
import { Select } from "../Select";
import { Input } from "../Input";
import { NumberInput } from "../NumberInput";
import { DateInput } from "../DateInput";
import { Button } from "../Button";
export const FilterEdit = (props) => {
    const [selectedBoolValue, setSelectedBoolValue] = createSignal(props.filter.field?.type === "bool"
        ? {
            label: props.filter.value ? "Is True" : "Is False",
            value: props.filter.value,
        }
        : null);
    const [selectedTextValue, setSelectedTextValue] = createSignal(props.filter.field?.type === "text" ? props.filter.value : "");
    const [selectedNumberValue, setSelectedNumberValue] = createSignal(props.filter.field?.type === "number" ? props.filter.value : 0);
    const [selectedSelectValue, setSelectedSelectValue] = createSignal(props.filter.field?.type === "select" ? props.filter.value : null);
    const [selectedDateValue, setSelectedDateValue] = createSignal(props.filter.field?.type === "date"
        ? props.filter.value
            ? new Date(props.filter.value)
            : null
        : null);
    const availableOperators = createMemo(() => props.filter.field
        ? Object.entries(filterLabels[props.filter.field.type]).map(([value, label]) => ({
            label,
            value: value,
        }))
        : []);
    const handleOperatorChange = (operator) => {
        props.setOperator(operator);
        switch (props.filter.field?.type) {
            case "number":
                props.setValue(0);
                props.setCanConfirm(true);
                return;
            case "text":
                props.setValue("");
            default:
                props.setValue(undefined);
        }
        props.setCanConfirm(false);
    };
    const handleFieldChange = (f) => {
        props.setField(f);
        const newOperator = f ? filterDefaults[f.type] : undefined;
        handleOperatorChange(newOperator);
    };
    const canConfirm = (val) => {
        if (!props.filter.field || !props.filter.operator || val === undefined || val === "" || val === null)
            return false;
        return true;
    };
    const handleValueChange = (val) => {
        if (Number.isNaN(val)) {
            props.setValue(0);
        }
        else {
            props.setValue(val);
        }
        props.setCanConfirm(canConfirm(val));
    };
    const selectValue = createMemo(() => {
        if (!props.filter.operator || !props.filter.field)
            return null;
        return {
            value: props.filter.operator,
            label: filterLabels[props.filter.field.type][props.filter.operator] || "",
        };
    });
    return (<div class="bg-base-100 p-2 rounded-box">
      <div class="flex justify-end mb-1">
        <Show when={props.onDelete}>
          <Button variant="ghost" size="xs" appearance="error" modifier="circle" onClick={props.onDelete}>
            <X size={12}/>
          </Button>
        </Show>
      </div>
      <div class="flex flex-col lg:flex-row gap-3">
        <Select label="Field" value={props.filter.field ?? null} labelKey="label" valueKey="name" onChange={(f) => handleFieldChange(f ?? undefined)} options={props.availableFields} size={props.size} class="min-w-50"/>
        <Show when={props.filter.field?.type !== "bool"}>
          <Select value={selectValue()} label="Operator" labelKey="label" valueKey="value" onChange={(v) => handleOperatorChange(v?.value)} options={availableOperators()} disabled={!props.filter.field} size={props.size} class="min-w-50"/>
        </Show>
        <Switch>
          <Match when={props.filter.field?.type === "bool"}>
            <Select label="Value" labelKey="label" valueKey="value" value={selectedBoolValue()} onChange={(val) => {
            setSelectedBoolValue(val);
            handleValueChange(val?.value);
        }} options={[
            { label: "Is True", value: true },
            { label: "Is False", value: false },
        ]} size={props.size} class="min-w-50"/>
          </Match>
          <Match when={props.filter.field?.type === "text"}>
            <Input label="Value" value={selectedTextValue()} onChange={(val) => {
            setSelectedTextValue(val);
            handleValueChange(val);
        }} size={props.size} class="min-w-50"/>
          </Match>
          <Match when={props.filter.field?.type === "number"}>
            <NumberInput label="Value" rawValue={selectedNumberValue()} onRawValueChange={(val) => {
            setSelectedNumberValue(val);
            handleValueChange(val);
        }} inputProps={{ class: "w-full" }} size={props.size} class="min-w-50"/>
          </Match>
          <Match when={props.filter.field?.type === "select"}>
            <Show when={["in", "not_in"].includes(props.filter.operator ?? "")} fallback={<Select value={selectedSelectValue()} label="Value" labelKey="label" valueKey="value" onChange={(val) => {
                setSelectedSelectValue(val);
                handleValueChange(val);
            }} options={props.filter.field?.options ?? []} disabled={!props.filter.operator || !props.filter.field?.options?.length} size={props.size} class="min-w-50"/>}>
              <Input label="Value" value={selectedTextValue()} onChange={(val) => {
            setSelectedTextValue(val);
            handleValueChange(val);
        }} size={props.size} class="min-w-50"/>
            </Show>
          </Match>
          <Match when={props.filter.field?.type === "date"}>
            <DateInput value={selectedDateValue()} onChange={(val) => {
            setSelectedDateValue(val);
            handleValueChange(val);
        }} label="Date" size={props.size} class="min-w-50"/>
          </Match>
        </Switch>
      </div>
    </div>);
};
export default FilterEdit;
