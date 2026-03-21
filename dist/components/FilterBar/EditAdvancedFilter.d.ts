import { Component } from "solid-js";
import { AdvancedFilter } from "./FilterBar";
interface EditAdvancedFilterProps {
    filter?: AdvancedFilter;
    onSave: (filter: AdvancedFilter) => void;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
}
export declare const EditAdvancedFilter: Component<EditAdvancedFilterProps>;
export default EditAdvancedFilter;
