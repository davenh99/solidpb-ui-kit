import { FilterField, SortOption } from "./FilterBar";
interface AddSortingDropDownProps<T> {
    availableFields: FilterField<T>[];
    sortBy?: SortOption<T>;
    setSortBy: (sort?: SortOption<T>) => void;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
}
export declare const AddSortingDropdown: <T>(props: AddSortingDropDownProps<T>) => import("solid-js").JSX.Element;
export default AddSortingDropdown;
