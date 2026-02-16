import { createEffect, createMemo, createSignal, Match, Switch } from "solid-js";
import { Popover } from "@kobalte/core/popover";
import Plus from "lucide-solid/icons/plus";

import { Filter, FilterField, FilterOperatorOption, filterOperators } from "./FilterBar";
import { Button } from "../Button";
import { Select } from "../Select";
import { Input } from "../Input";
import { NumberInput } from "../NumberInput";

interface AddFilterDropdownProps<T> {
  fields: FilterField<T>[];
  onFilterAdd: (filter: Filter<T>) => void;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  setOpen: (v: boolean) => void;
}

export const AddFilterDropdown = <T,>(props: AddFilterDropdownProps<T>) => {
  const [selectedField, setSelectedField] = createSignal<FilterField<T> | null>(null);
  const [selectedOperator, setSelectedOperator] = createSignal<FilterOperatorOption | null>(null);
  // in some cases we will pass null if there is no selected value (i.e. for checking 'is_set', we don't need a value)
  // undefined is the true 'nothing selected', and will disable the add button
  const [selectedValue, setSelectedValue] = createSignal<any>();
  const [selectedBoolValue, setSelectedBoolValue] = createSignal<{ label: string; value: boolean } | null>(
    null,
  );
  const [selectedTextValue, setSelectedTextValue] = createSignal("");
  const [selectedNumberValue, setSelectedNumberValue] = createSignal(0);
  const [selectedSelectValue, setSelectedSelectValue] = createSignal<unknown | null>(null);
  const [selectedDateValues, setSelectedDateValues] = createSignal<{ startDate: Date; endDate: Date } | null>(
    null,
  );

  const availableOperators = createMemo(() => {
    if (selectedField() !== null) {
      return filterOperators[selectedField()!.type];
    }
    return [];
  });

  const handleOperatorChange = (operator: FilterOperatorOption | null) => {
    setSelectedOperator(operator);
    if (["is_set", "is_not_set"].includes(operator?.value ?? "")) {
      setSelectedValue(null);
    } else {
      setSelectedValue(undefined);
    }
  };

  const handleFieldChange = (f: FilterField<T> | null) => {
    setSelectedField(f);
    handleOperatorChange(null);
  };

  const handleAddFilter = () => {
    props.onFilterAdd({
      id: crypto.randomUUID(),
      field: selectedField()!,
      operator: selectedOperator()!.value,
      value: selectedValue(),
    });
    setSelectedValue(null);
    setSelectedTextValue("");
    setSelectedBoolValue(null);
    props.setOpen(false);
  };

  return (
    <Popover.Portal>
      <Popover.Content class="dropdown-content mt-1 rounded-box bg-base-100 shadow-md z-20 p-3">
        <div class="flex flex-col min-w-40 gap-3">
          <p class="text-sm">Add a filter</p>
          <Select<FilterField<T>>
            label="Field"
            value={selectedField()}
            labelKey="label"
            valueKey="name"
            onChange={handleFieldChange}
            options={props.fields}
          />
          <Select<FilterOperatorOption>
            value={selectedOperator()}
            label="Operator"
            labelKey="label"
            valueKey="value"
            onChange={handleOperatorChange}
            options={availableOperators()}
            disabled={!selectedField()}
          />
          <Switch>
            <Match when={selectedField()?.type === "bool"}>
              <Select<{ label: string; value: boolean }>
                label="Value"
                labelKey="label"
                valueKey="value"
                value={selectedBoolValue()}
                onChange={setSelectedBoolValue}
                options={[
                  { label: "True", value: true },
                  { label: "False", value: false },
                ]}
              />
            </Match>
            <Match
              when={
                selectedField()?.type === "text" &&
                !["is_set", "is_not_set"].includes(selectedOperator()?.value ?? "")
              }
            >
              <Input
                label="Value"
                value={selectedTextValue()}
                onChange={(val) => {
                  setSelectedValue(val);
                  setSelectedTextValue(val);
                }}
              />
            </Match>
            <Match when={selectedField()?.type === "number"}>
              <NumberInput
                label="Value"
                rawValue={selectedNumberValue()}
                onRawValueChange={(val) => {
                  setSelectedValue(val);
                  setSelectedNumberValue(val);
                }}
              />
            </Match>
          </Switch>
          <div class="w-full flex justify-end gap-1">
            <Button appearance="secondary" size="xs">
              <Plus class="h-[1em] w-[1em]" /> Condition
            </Button>
            <Button
              appearance="success"
              disabled={!selectedField() || !selectedOperator() || selectedValue() !== undefined}
              size="xs"
              onClick={handleAddFilter}
            >
              <Plus class="h-[1em] w-[1em]" /> Add
            </Button>
          </div>
        </div>
      </Popover.Content>
    </Popover.Portal>
  );
};

export default AddFilterDropdown;
