import { Component, Setter } from "solid-js";
import { AdvancedFilter, Filter, FilterGroup } from "./FilterBar";
interface FilterChipOrGroupProps {
    onGroupDrag?: (sourceInd: number, sourceFilterGroupInd?: number) => void;
    onDelete?: () => void;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    class?: string;
    index: number;
    setOpen?: Setter<boolean>;
}
interface FilterChipProps<T> extends FilterChipOrGroupProps {
    onClick?: (filter: Filter<T>) => void;
    filter: Filter<T>;
    isInGroup?: boolean;
    groupIndex?: number;
}
export declare const FilterChip: <T>(props: FilterChipProps<T>) => import("solid-js").JSX.Element;
interface FilterGroupProps<T> extends FilterChipOrGroupProps {
    filterGroup: FilterGroup<T>;
    onClick?: (filterGroup: FilterGroup<T>) => void;
}
export declare const FilterGroupChip: <T>(props: FilterGroupProps<T>) => import("solid-js").JSX.Element;
interface AdvancedFilterChipProps extends FilterChipOrGroupProps {
    filter: AdvancedFilter;
}
export declare const AdvancedFilterChip: Component<AdvancedFilterChipProps>;
export default FilterChip;
