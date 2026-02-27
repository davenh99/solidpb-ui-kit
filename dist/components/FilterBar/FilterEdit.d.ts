import { Filter, FilterField, FilterOperator, FilterValue } from "./FilterBar";
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
export declare const FilterEdit: <T>(props: FilterEditProps<T>) => import("solid-js").JSX.Element;
export default FilterEdit;
