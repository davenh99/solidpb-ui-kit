import { createEffect, createMemo, createSignal, For, JSXElement, Show } from "solid-js";

import { Filter, FilterField } from "./FilterBar";
import { Button } from "../Button";
import FilterEdit from "./FilterEdit";
import { createStore } from "solid-js/store";

interface FiltersEditProps<T> {
  availableFields: FilterField<T>[];
  filters: Partial<Filter<T>>[];
  onSaveFilters: (filters: Filter<T>[]) => void;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  saveTrigger: JSXElement;
  addConditionTrigger?: JSXElement;
}

export const FiltersEdit = <T,>(props: FiltersEditProps<T>) => {
  const [filters, setFilters] = createStore<Partial<Filter<T>>[]>(props.filters);
  const [filtersReady, setFiltersReady] = createSignal<boolean[]>(props.filters.map(() => false));

  const allFiltersReady = createMemo(() => [...filtersReady()].every(Boolean));

  const handleSaveFilters = () => {
    if (allFiltersReady()) {
      props.onSaveFilters(filters as Filter<T>[]);
    }
  };

  const addNewFilter = () => {
    setFilters(filters.length, {});
    setFiltersReady([...filtersReady(), false]);
  };

  const deleteFilter = (ind: number) => {
    setFilters((prev) => prev.filter((_, i) => i !== ind));
    setFiltersReady((prev) => prev.filter((_, i) => i !== ind));
  };

  return (
    <div class="flex flex-col gap-2 bg-base-200">
      <p class="text-sm">Add filters</p>
      <For each={filters}>
        {(f, i) => (
          <>
            {i() > 0 && <span class="divider italic text-xs m-0">OR</span>}
            <FilterEdit<T>
              availableFields={props.availableFields}
              filter={f}
              setField={(field) => setFilters(i(), { ...filters[i()], field })}
              setOperator={(operator) => setFilters(i(), { ...filters[i()], operator })}
              setValue={(value) => setFilters(i(), { ...filters[i()], value })}
              setCanConfirm={(v) =>
                setFiltersReady((prev) => {
                  const next = [...prev];
                  next[i()] = v;
                  return next;
                })
              }
              size={props.size}
              onDelete={filters.length > 1 ? () => deleteFilter(i()) : undefined}
            />
          </>
        )}
      </For>
      <div class="w-full flex justify-end gap-1">
        <Show when={props.addConditionTrigger !== undefined}>
          <Button appearance="secondary" size="xs" onClick={addNewFilter}>
            {props.addConditionTrigger}
          </Button>
        </Show>
        <Button appearance="success" disabled={!allFiltersReady()} size="xs" onClick={handleSaveFilters}>
          {props.saveTrigger}
        </Button>
      </div>
    </div>
  );
};

export default FiltersEdit;
