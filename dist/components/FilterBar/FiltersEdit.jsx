import { createMemo, createSignal, For, Show } from "solid-js";
import { Button } from "../Button";
import FilterEdit from "./FilterEdit";
import { createStore } from "solid-js/store";
export const FiltersEdit = (props) => {
    const [filters, setFilters] = createStore(props.filters);
    const [filtersReady, setFiltersReady] = createSignal(props.filters.map(() => props.filtersReady || false));
    const allFiltersReady = createMemo(() => [...filtersReady()].every(Boolean));
    const handleSaveFilters = () => {
        if (allFiltersReady()) {
            props.onSaveFilters(filters);
        }
    };
    const addNewFilter = () => {
        setFilters(filters.length, {});
        setFiltersReady([...filtersReady(), false]);
    };
    const deleteFilter = (ind) => {
        setFilters((prev) => prev.filter((_, i) => i !== ind));
        setFiltersReady((prev) => prev.filter((_, i) => i !== ind));
    };
    return (<div class="flex flex-col gap-2 bg-base-200">
      <For each={filters}>
        {(f, i) => (<>
            {i() > 0 && <span class="divider italic text-xs m-0">OR</span>}
            <FilterEdit availableFields={props.availableFields} filter={f} setField={(field) => setFilters(i(), { ...filters[i()], field })} setOperator={(operator) => setFilters(i(), { ...filters[i()], operator })} setValue={(value) => setFilters(i(), { ...filters[i()], value })} setCanConfirm={(v) => setFiltersReady((prev) => {
                const next = [...prev];
                next[i()] = v;
                return next;
            })} size={props.size} onDelete={filters.length > 1 ? () => deleteFilter(i()) : undefined}/>
          </>)}
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
    </div>);
};
export default FiltersEdit;
