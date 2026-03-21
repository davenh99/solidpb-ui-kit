import { JSXElement } from "solid-js";
export type FieldType = "text" | "number" | "date" | "select" | "bool";
export type FilterOperator = "=" | "!=" | ">" | ">=" | "<" | "<=" | "~" | "!~" | "?=" | "?!=" | "?>" | "?>=" | "?<" | "?<=" | "?~" | "?!~";
export declare const filterDefaults: Record<FieldType, FilterOperator>;
export declare const filterLabels: Record<FieldType, Partial<Record<FilterOperator, string>>>;
export type FilterSelectValue = {
    label: string;
    value: string;
};
export type FilterValue = string | number | boolean | FilterSelectValue | Date | null;
export interface Filter<T> {
    field: FilterField<T>;
    operator: FilterOperator;
    value: FilterValue;
}
export interface FilterGroup<T> {
    filters: Filter<T>[];
}
export interface AdvancedFilter {
    label: string;
    filter: string;
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
interface SavedFilterPreset<T> {
    filter: AdvancedFilter;
    sortBy?: SortOption<T>[];
    onApply: () => void;
}
interface FilterBarProps<T> {
    items?: (Filter<T> | FilterGroup<T> | AdvancedFilter)[];
    setItems?: (items: (Filter<T> | FilterGroup<T> | AdvancedFilter)[]) => void;
    availableFields?: FilterField<T>[];
    leftAction?: JSXElement;
    sortBy?: SortOption<T>;
    setSortBy?: (sort?: SortOption<T>) => void;
    onAddFilterGroup: (filters: Filter<T>[]) => void;
    onUpdateFilterGroup: (ind: number, filters: Filter<T>[]) => void;
    onAddAdvancedFilter: (filter: AdvancedFilter) => void;
    onUpdateAdvancedFilter: (ind: number, filter: AdvancedFilter) => void;
    onFilterRemove: (ind: number, filter: Filter<T> | FilterGroup<T> | AdvancedFilter) => void;
    onGroupDrag: (sourceInd: number, targetInd: number, sourceFilterGroupInd?: number) => void;
    value: string;
    onChangeValue: (val: string) => void;
    placeholder?: string;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    class?: string;
    savedFilters?: SavedFilterPreset<T>[];
    onSavePreset?: (name: string, items: (Filter<T> | FilterGroup<T> | AdvancedFilter)[]) => Promise<void>;
}
export declare const FilterBar: <T>(props: FilterBarProps<T>) => import("solid-js").JSX.Element;
export {};
