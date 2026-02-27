import { JSXElement } from "solid-js";
import { Filter, FilterField } from "./FilterBar";
interface FiltersEditProps<T> {
    availableFields: FilterField<T>[];
    filters: Partial<Filter<T>>[];
    onSaveFilters: (filters: Filter<T>[]) => void;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    saveTrigger: JSXElement;
    addConditionTrigger?: JSXElement;
    filtersReady?: boolean;
}
export declare const FiltersEdit: <T>(props: FiltersEditProps<T>) => import("solid-js").JSX.Element;
export default FiltersEdit;
