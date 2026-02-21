import { createMemo, createSignal, Match, Setter, Show, Switch } from "solid-js";
import { createStore } from "solid-js/store";
import X from "lucide-solid/icons/x";

import { Filter, FilterField, filterDefaults, filterLabels, FilterOperator, FilterValue } from "./FilterBar";
import { Select } from "../Select";
import { Input } from "../Input";
import { NumberInput } from "../NumberInput";
import { DateInput } from "../DateInput";
import { Button } from "../Button";

interface FilterEditProps<T> {
  availableFields: FilterField<T>[];
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  filter: Partial<Filter<T>>;
  setField: (field?: FilterField<T>) => void;
  setOperator: (operator?: FilterOperator) => void;
  setValue: (value?: FilterValue) => void;
  setCanConfirm: (v: boolean) => void;
  onDelete?: () => void;
}

export const FilterEdit = <T,>(props: FilterEditProps<T>) => {
  const selectedField = createMemo(() => props.filter.field);
  const selectedOperator = createMemo(() => props.filter.operator);
  const selectedValue = createMemo(() => props.filter.value);
  const [selectedBoolValue, setSelectedBoolValue] = createSignal<{ label: string; value: boolean } | null>(
    null,
  );
  const [selectedTextValue, setSelectedTextValue] = createSignal("");
  const [selectedNumberValue, setSelectedNumberValue] = createSignal(0);
  const [selectedSelectValue, setSelectedSelectValue] = createSignal<{ label: string; value: string } | null>(
    null,
  );
  const [selectedDateValues, setSelectedDateValues] = createStore<{
    startDate: Date | null;
    endDate: Date | null;
  }>({ startDate: null, endDate: null });

  const availableOperators = createMemo(() =>
    selectedField()
      ? Object.entries(filterLabels[selectedField()!.type]).map(([value, label]) => ({
          label,
          value: value as FilterOperator,
        }))
      : [],
  );

  const handleOperatorChange = (operator?: FilterOperator) => {
    props.setOperator(operator);

    if (["is_set", "is_not_set"].includes(operator ?? "")) {
      props.setCanConfirm(true);
      props.setValue(null);
    } else {
      props.setValue(undefined);
      // hmm, for ux I don't want to clear too much when switching operator. will see how this feels
      setSelectedDateValues("endDate", null);
    }
  };

  const handleFieldChange = (f?: FilterField<T>) => {
    props.setField(f);
    const newOperator = f ? filterDefaults[f.type] : undefined;
    handleOperatorChange(newOperator);
  };

  const canConfirm = () => {
    if (!selectedField() || !selectedOperator() || selectedValue() === undefined || selectedValue() === "")
      return false;

    if (
      selectedField()?.type === "date" &&
      selectedOperator() === "between" &&
      (selectedDateValues.endDate === null || selectedDateValues.startDate === null)
    ) {
      return false;
    }

    return true;
  };

  const handleValueChange = (val?: FilterValue) => {
    props.setValue(val);
    props.setCanConfirm(canConfirm());
  };

  const selectValue = createMemo(() => {
    if (!selectedOperator() || !selectedField()) return null;

    return {
      value: selectedOperator()!,
      label: filterLabels[selectedField()!.type][selectedOperator()!] || "",
    };
  });

  return (
    <div class="bg-base-100 p-2 rounded-box">
      <div class="flex justify-end mb-1">
        <Show when={props.onDelete}>
          <Button variant="ghost" size="xs" appearance="error" modifier="circle" onClick={props.onDelete}>
            <X size={12} />
          </Button>
        </Show>
      </div>
      <div class="flex flex-col lg:flex-row min-w-50 lg:min-w-150 gap-3">
        <Select<FilterField<T>>
          label="Field"
          value={selectedField() ?? null}
          labelKey="label"
          valueKey="name"
          onChange={(f) => handleFieldChange(f ?? undefined)}
          options={props.availableFields}
          size={props.size}
          class="min-w-50"
        />
        <Show when={selectedField()?.type !== "bool"}>
          <Select<{ value: FilterOperator; label: string }>
            value={selectValue()}
            label="Operator"
            labelKey="label"
            valueKey="value"
            onChange={(v) => handleOperatorChange(v?.value)}
            options={availableOperators()}
            disabled={!selectedField()}
            size={props.size}
            class="min-w-50"
          />
        </Show>
        <Switch>
          <Match when={selectedField()?.type === "bool"}>
            <Select<{ label: string; value: boolean }>
              label="Value"
              labelKey="label"
              valueKey="value"
              value={selectedBoolValue()}
              onChange={(val) => {
                setSelectedBoolValue(val);
                handleValueChange(val?.value);
              }}
              options={[
                { label: "Is True", value: true },
                { label: "Is False", value: false },
              ]}
              size={props.size}
              class="min-w-50"
            />
          </Match>
          <Match
            when={
              selectedField()?.type === "text" && !["is_set", "is_not_set"].includes(selectedOperator() ?? "")
            }
          >
            <Input
              label="Value"
              value={selectedTextValue()}
              onChange={(val) => {
                setSelectedTextValue(val);
                handleValueChange(val);
              }}
              size={props.size}
              class="min-w-50"
            />
          </Match>
          <Match when={selectedField()?.type === "number"}>
            <NumberInput
              label="Value"
              rawValue={selectedNumberValue()}
              onRawValueChange={(val) => {
                setSelectedNumberValue(val);
                handleValueChange(val);
              }}
              inputProps={{ class: "w-full" }}
              size={props.size}
              class="min-w-50"
            />
          </Match>
          <Match
            when={
              selectedField()?.type === "select" &&
              !["is_set", "is_not_set"].includes(selectedOperator() ?? "")
            }
          >
            <Show
              when={["in", "not_in"].includes(selectedOperator() ?? "")}
              fallback={
                <Select<{ label: string; value: string }>
                  value={selectedSelectValue()}
                  label="Value"
                  labelKey="label"
                  valueKey="value"
                  onChange={(val) => {
                    setSelectedSelectValue(val);
                    handleValueChange(val);
                  }}
                  options={selectedField()?.options ?? []}
                  disabled={!selectedOperator() || !selectedField()?.options?.length}
                  size={props.size}
                  class="min-w-50"
                />
              }
            >
              <Input
                label="Value"
                value={selectedTextValue()}
                onChange={(val) => {
                  setSelectedTextValue(val);
                  handleValueChange(val);
                }}
                size={props.size}
                class="min-w-50"
              />
            </Show>
          </Match>
          <Match
            when={
              selectedField()?.type === "date" && !["is_set", "is_not_set"].includes(selectedOperator() ?? "")
            }
          >
            <DateInput
              value={selectedDateValues.startDate}
              onChange={(val) => {
                setSelectedDateValues("startDate", val);
                let newVal = undefined;
                if (val && !(selectedOperator() === "between" && selectedDateValues.endDate !== null)) {
                  newVal = { ...selectedDateValues };
                }
                handleValueChange(newVal);
              }}
              max={
                selectedDateValues.endDate ? selectedDateValues.endDate.toISOString().slice(0, 10) : undefined
              }
              label={selectedOperator() === "between" ? "Start" : ""}
              size={props.size}
              class="min-w-50"
            />
            <Show when={selectedOperator() === "between"}>
              <DateInput
                value={selectedDateValues.endDate}
                label="End"
                min={
                  selectedDateValues.startDate
                    ? selectedDateValues.startDate.toISOString().slice(0, 10)
                    : undefined
                }
                onChange={(val) => {
                  setSelectedDateValues("endDate", val);
                  let newVal = undefined;
                  if (val && selectedDateValues.startDate !== null) {
                    newVal = { ...selectedDateValues };
                  }
                  handleValueChange(newVal);
                }}
                size={props.size}
                class="min-w-50"
              />
            </Show>
          </Match>
        </Switch>
      </div>
    </div>
  );
};

export default FilterEdit;
