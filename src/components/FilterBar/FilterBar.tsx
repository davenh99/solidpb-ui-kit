import { Component } from "solid-js";
import { TextField, type TextFieldInputProps, type TextFieldRootProps } from "@kobalte/core/text-field";
import { tv } from "tailwind-variants";
import Search from "lucide-solid/icons/search";

type FilterOperator =
  // Text operators
  | "loose_contains" // Default: splits by space, matches all words
  | "strict_contains" // Treats as single string with spaces
  | "fuzzy_match" // Custom fuzzy matching
  | "equals"
  | "not_equals"
  | "starts_with"
  | "ends_with"
  // Numeric/Date operators
  | "greater_than"
  | "less_than"
  | "between"
  // General
  | "in"
  | "not_in"
  | "is_set"
  | "is_not_set";

interface Filter {
  id: string;
  field: string;
  operator: FilterOperator;
  value: any;
  label?: string; // Computed display label
}

interface FilterGroup {
  id: string;
  filters: Filter[]; // Combined with OR logic
  label?: string; // Display label for the group chip
}

interface FilterField {
  name: string;
  label: string;
  type: "text" | "number" | "date" | "select" | "multiselect" | "boolean";
  operators?: FilterOperator[]; // Available operators for this field type
  options?: { label: string; value: any }[];
  searchable?: boolean; // Show in quick search text fields
}

interface SortOption {
  field: string;
  direction: "asc" | "desc";
  label?: string;
}

interface FilterBarProps {
  // State - array of filters AND filter groups (combined with AND)
  items?: (Filter | FilterGroup)[];
  setItems?: (items: (Filter | FilterGroup)[]) => void;

  // Configuration
  availableFields?: FilterField[];
  textSearchFields?: string[]; // Fields to search when typing in main input

  // Sorting
  sortBy?: SortOption[];
  setSortBy?: (sort: SortOption[]) => void;
  sortableFields?: string[]; // Fields that can be sorted

  // Callbacks
  onFilterAdd?: (filter: Filter) => void;
  onFilterRemove?: (filter: Filter) => void;
  onFilterUpdate?: (filter: Filter) => void;
  onGroupCreate?: (group: FilterGroup) => void;
  onGroupUpdate?: (group: FilterGroup) => void;

  // UI
  placeholder?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  value?: string;
  onChangeValue?: (val: string) => void;
  class?: string;

  // Later
  //   savedFilters?: SavedFilterPreset[];
  //   onSavePreset?: (name: string, items: (Filter | FilterGroup)[]) => void;

  // Grouping
}

const filterBar = tv({
  base: "input outline-offset-0",
  variants: {
    size: {
      xs: "input-xs",
      sm: "input-sm",
      md: "input-md",
      lg: "input-lg",
      xl: "input-xl",
    },
  },
});

export const FilterBar: Component<FilterBarProps> = (props) => {
  return (
    <TextField value={props.value} onChange={props.onChangeValue} class={filterBar({ size: props.size })}>
      <Search class="w-[1em] h-[1em] shrink-0 opacity-70" />
      <TextField.Input placeholder={props.placeholder || "Search"} class="grow" />
    </TextField>
  );
};
