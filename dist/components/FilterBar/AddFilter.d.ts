import { Filter, FilterField } from "./FilterBar";
interface AddFilterProps<T> {
    availableFields: FilterField<T>[];
    onAddFilters: (filters: Filter<T>[]) => void;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    setOpen: (v: boolean) => void;
}
export declare const AddFilter: <T>(props: AddFilterProps<T>) => import("solid-js").JSX.Element;
export default AddFilter;
