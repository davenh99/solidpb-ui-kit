import { Filter, FilterField } from "./FilterBar";
interface EditFiltersProps<T> {
    availableFields: FilterField<T>[];
    onSaveFilters: (filters: Filter<T>[]) => void;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    setOpen: (v: boolean) => void;
    currentFilters: Filter<T>[];
}
export declare const EditFilters: <T>(props: EditFiltersProps<T>) => import("solid-js").JSX.Element;
export default EditFilters;
