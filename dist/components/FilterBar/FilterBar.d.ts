import { JSXElement } from "solid-js";
export type FieldType = "text" | "number" | "date" | "select" | "bool";
export type FilterOperator = "loose_contains" | "fuzzy_match" | "is" | "is_not" | "greater_than" | "less_than" | "between" | "in" | "not_in" | "is_set" | "is_not_set";
export declare const filterDefaults: Record<FieldType, FilterOperator>;
export declare const filterLabels: Record<FieldType, Partial<Record<FilterOperator, string>>>;
export type FilterSelectValue = {
    label: string;
    value: string;
};
export type FilterDateValue = {
    startDate: Date | null;
    endDate: Date | null;
};
export type FilterValue = string | number | boolean | FilterSelectValue | FilterDateValue | null;
export interface Filter<T> {
    field: FilterField<T>;
    operator: FilterOperator;
    value: FilterValue;
}
export interface FilterGroup<T> {
    filters: Filter<T>[];
}
export interface FilterField<T> {
    name: keyof T;
    label: string;
    type: FieldType;
    options?: {
        label: string;
        value: string;
    }[];
}
export interface SortOption<T> {
    field: keyof T;
    direction: "asc" | "desc";
}
interface FilterBarProps<T> {
    items?: (Filter<T> | FilterGroup<T>)[];
    setItems?: (items: (Filter<T> | FilterGroup<T>)[]) => void;
    availableFields?: FilterField<T>[];
    leftAction?: JSXElement;
    sortBy?: SortOption<T>;
    setSortBy?: (sort?: SortOption<T>) => void;
    onAddFilterGroup: (filters: Filter<T>[]) => void;
    onUpdateFilterGroup: (ind: number, filters: Filter<T>[]) => void;
    onFilterRemove: (ind: number, filter: Filter<T>) => void;
    onGroupDrag: (sourceInd: number, targetInd: number, sourceFilterGroupInd?: number) => void;
    value: string;
    onChangeValue: (val: string) => void;
    placeholder?: string;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    class?: string;
}
export declare const FilterBar: <T>(props: FilterBarProps<T>) => import("solid-js").JSX.Element;
export {};
