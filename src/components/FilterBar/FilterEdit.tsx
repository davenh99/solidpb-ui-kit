import { createMemo, createSignal, Match, Show, Switch } from "solid-js";
import { createStore } from "solid-js/store";
import X from "lucide-solid/icons/x";

import {
  Filter,
  FilterField,
  filterDefaults,
  filterLabels,
  FilterOperator,
  FilterValue,
  FilterSelectValue,
  FilterDateValue,
} from "./FilterBar";
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
  const [selectedBoolValue, setSelectedBoolValue] = createSignal<{ label: string; value: boolean } | null>(
    props.filter.field?.type === "bool"
      ? {
          label: (props.filter.value as boolean) ? "Is True" : "Is False",
          value: props.filter.value as boolean,
        }
      : null,
  );
  const [selectedTextValue, setSelectedTextValue] = createSignal<string>(
    props.filter.field?.type === "text" ? (props.filter.value as string) : "",
  );
  const [selectedNumberValue, setSelectedNumberValue] = createSignal<number>(
    props.filter.field?.type === "number" ? (props.filter.value as number) : 0,
  );
  const [selectedSelectValue, setSelectedSelectValue] = createSignal<FilterSelectValue | null>(
    props.filter.field?.type === "select" ? (props.filter.value as FilterSelectValue | null) : null,
  );
  const [selectedDateValues, setSelectedDateValues] = createStore<FilterDateValue>(
    props.filter.field?.type === "date"
      ? (props.filter.value as FilterDateValue)
      : { startDate: null, endDate: null },
  );

  const availableOperators = createMemo(() =>
    props.filter.field
      ? Object.entries(filterLabels[props.filter.field!.type]).map(([value, label]) => ({
          label,
          value: value as FilterOperator,
        }))
      : [],
  );

  const handleOperatorChange = (operator?: FilterOperator) => {
    props.setOperator(operator);

    if (["is_set", "is_not_set"].includes(operator ?? "")) {
      props.setValue(null);
      props.setCanConfirm(true);
    } else {
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
      // hmm, for ux I don't want to clear too much when switching operator. will see how this feels.
      // need to do this for canConfirm behaviour atm
      setSelectedDateValues("endDate", null);
    }
  };

  const handleFieldChange = (f?: FilterField<T>) => {
    props.setField(f);
    const newOperator = f ? filterDefaults[f.type] : undefined;
    handleOperatorChange(newOperator);
  };

  const canConfirm = (val?: FilterValue) => {
    if (!props.filter.field || !props.filter.operator || val === undefined || val === "") return false;

    if (
      props.filter.field?.type === "date" &&
      props.filter.operator === "between" &&
      (selectedDateValues.endDate === null || selectedDateValues.startDate === null)
    ) {
      return false;
    }

    return true;
  };

  const handleValueChange = (val?: FilterValue) => {
    if (Number.isNaN(val)) {
      props.setValue(0);
    } else {
      props.setValue(val);
    }
    props.setCanConfirm(canConfirm(val));
  };

  const selectValue = createMemo(() => {
    if (!props.filter.operator || !props.filter.field) return null;

    return {
      value: props.filter.operator!,
      label: filterLabels[props.filter.field!.type][props.filter.operator!] || "",
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
          value={props.filter.field ?? null}
          labelKey="label"
          valueKey="name"
          onChange={(f) => handleFieldChange(f ?? undefined)}
          options={props.availableFields}
          size={props.size}
          class="min-w-50"
        />
        <Show when={props.filter.field?.type !== "bool"}>
          <Select<{ value: FilterOperator; label: string }>
            value={selectValue()}
            label="Operator"
            labelKey="label"
            valueKey="value"
            onChange={(v) => handleOperatorChange(v?.value)}
            options={availableOperators()}
            disabled={!props.filter.field}
            size={props.size}
            class="min-w-50"
          />
        </Show>
        <Switch>
          <Match when={props.filter.field?.type === "bool"}>
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
              props.filter.field?.type === "text" &&
              !["is_set", "is_not_set"].includes(props.filter.operator ?? "")
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
          <Match when={props.filter.field?.type === "number"}>
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
              props.filter.field?.type === "select" &&
              !["is_set", "is_not_set"].includes(props.filter.operator ?? "")
            }
          >
            <Show
              when={["in", "not_in"].includes(props.filter.operator ?? "")}
              fallback={
                <Select<FilterSelectValue>
                  value={selectedSelectValue()}
                  label="Value"
                  labelKey="label"
                  valueKey="value"
                  onChange={(val) => {
                    setSelectedSelectValue(val);
                    handleValueChange(val);
                  }}
                  options={props.filter.field?.options ?? []}
                  disabled={!props.filter.operator || !props.filter.field?.options?.length}
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
              props.filter.field?.type === "date" &&
              !["is_set", "is_not_set"].includes(props.filter.operator ?? "")
            }
          >
            <DateInput
              value={selectedDateValues.startDate}
              onChange={(val) => {
                setSelectedDateValues("startDate", val);
                let newVal = undefined;
                if (val && !(props.filter.operator === "between" && selectedDateValues.endDate !== null)) {
                  newVal = { ...selectedDateValues };
                }
                handleValueChange(newVal);
              }}
              max={
                selectedDateValues.endDate ? selectedDateValues.endDate.toISOString().slice(0, 10) : undefined
              }
              label={props.filter.operator === "between" ? "Start" : ""}
              size={props.size}
              class="min-w-50"
            />
            <Show when={props.filter.operator === "between"}>
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
