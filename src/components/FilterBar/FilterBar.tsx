import { createMemo, createSignal, For, Show } from "solid-js";
import { TextField } from "@kobalte/core/text-field";
import { Popover } from "@kobalte/core/popover";
import { tv } from "tailwind-variants";
import Search from "lucide-solid/icons/search";
import ListFilter from "lucide-solid/icons/list-filter";
import ArrowDown from "lucide-solid/icons/arrow-down-narrow-wide";

import FilterChip, { FilterGroupChip } from "./FilterChip";
import { Button } from "../Button";
import AddFilterDropdown from "./AddFilterDropdown";
import AddSortingDropdown from "./AddSortingDropdown";
import EditFiltersDropdown from "./EditFiltersDropdown";

export type FieldType = "text" | "number" | "date" | "select" | "bool";

export type FilterOperator =
  | "loose_contains" // Default: splits by space, matches all words
  | "fuzzy_match" // Custom fuzzy matching
  | "is"
  | "is_not"
  | "greater_than"
  | "less_than"
  | "between"
  | "in"
  | "not_in"
  | "is_set"
  | "is_not_set";

export const filterDefaults: Record<FieldType, FilterOperator> = {
  text: "loose_contains",
  bool: "is",
  number: "is",
  select: "is",
  date: "greater_than",
};

export const filterLabels: Record<FieldType, Partial<Record<FilterOperator, string>>> = {
  text: {
    loose_contains: "Contains",
    in: "Contains (strict)",
    not_in: "Doesn't contain",
    fuzzy_match: "Fuzzy contains",
    is: "Is",
    is_not: "Is not",
    is_set: "Is set",
    is_not_set: "Is not set",
  },
  bool: {
    is: "Is",
  },
  number: {
    is: "Is",
    greater_than: "Is greater than",
    less_than: "Is less than",
    between: "Is between",
    is_not: "Is not",
  },
  select: {
    is: "Is",
    is_not: "Is not",
    in: "Contains",
    not_in: "Doesn't contain",
    is_set: "Is set",
    is_not_set: "Is not set",
  },
  date: {
    greater_than: "Is after",
    less_than: "Is before",
    between: "Is between",
    is: "Is",
    is_not: "Is not",
    is_set: "Is set",
    is_not_set: "Is not set",
  },
};

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
  filters: Filter<T>[]; // Combined with OR logic
}

export interface FilterField<T> {
  name: keyof T;
  label: string;
  type: FieldType;
  operators?: FilterOperator[]; // Available operators for this field type
  options?: { label: string; value: string }[];
  searchable?: boolean; // Show in quick search text fields
}

export interface SortOption<T> {
  field: keyof T;
  direction: "asc" | "desc";
}

// interface SavedFilterPreset {
//   id: string;
//   name: string;
//   items: (Filter | FilterGroup)[];
//   sortBy?: SortOption[];
// }

interface FilterBarProps<T> {
  // State - array of filters AND filter groups (combined with AND)
  items?: (Filter<T> | FilterGroup<T>)[];
  setItems?: (items: (Filter<T> | FilterGroup<T>)[]) => void;

  // Configuration
  availableFields?: FilterField<T>[];

  // Sorting
  sortBy?: SortOption<T>;
  setSortBy?: (sort?: SortOption<T>) => void;

  // Callbacks
  onAddFilterGroup: (filters: Filter<T>[]) => void;
  onUpdateFilterGroup: (ind: number, filters: Filter<T>[]) => void;
  onFilterRemove: (ind: number, filter: Filter<T>) => void;

  // Dragging
  // if sourceFilterGroupInd exists, we are dragging an item from the group, not the group itself
  onGroupDrag: (sourceInd: number, targetInd: number, sourceFilterGroupInd?: number) => void;

  // UI
  value: string;
  onChangeValue: (val: string) => void;
  placeholder?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  class?: string;

  // Later
  //   savedFilters?: SavedFilterPreset[];
  //   onSavePreset?: (name: string, items: (Filter | FilterGroup)[]) => void;

  // Grouping
}

const filterBar = tv({
  base: "textarea outline-offset-0 gap-1 flex items-start flex-wrap p-1 min-h-2",
  variants: {
    size: {
      xs: "input-xs",
      sm: "input-sm",
      md: "input-md",
      lg: "input-lg",
      xl: "input-xl",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

export const FilterBar = <T,>(props: FilterBarProps<T>) => {
  const [filterDropdownOpen, setFilterDropdownOpen] = createSignal(false);
  const showFieldDropdown = createMemo(() => {
    return !!props.value;
  });
  const textFields = createMemo(() => props.availableFields?.filter((f) => f.type === "text"));

  const createTextFilter = (field: FilterField<T>) => {
    const newFilter: Filter<T> = {
      field,
      operator: "loose_contains",
      value: props.value,
    };

    props.onAddFilterGroup([newFilter]);

    props.onChangeValue("");
  };

  const isFilterGroup = (item: Filter<T> | FilterGroup<T>): item is FilterGroup<T> => {
    return "filters" in item;
  };

  return (
    <div class="relative">
      <div class="flex gap-1 items-start">
        <TextField
          value={props.value}
          onChange={props.onChangeValue}
          class={filterBar({ size: props.size, class: props.class })}
        >
          <Search class="w-[1em] h-[1em] opacity-70 m-1.5" />
          <For each={props.items}>
            {(item, i) => {
              const [itemOpen, setItemOpen] = createSignal(false);

              return (
                <Popover open={itemOpen()} onOpenChange={setItemOpen}>
                  <Popover.Trigger>
                    <Show
                      when={isFilterGroup(item)}
                      fallback={
                        <FilterChip<T>
                          onDelete={() => props.onFilterRemove(i(), item as Filter<T>)}
                          filter={item as Filter<T>}
                          size={props.size}
                          onGroupDrag={props.onGroupDrag}
                        />
                      }
                    >
                      <FilterGroupChip<T>
                        filterGroup={item as FilterGroup<T>}
                        size={props.size}
                        onGroupDrag={props.onGroupDrag}
                      />
                    </Show>
                  </Popover.Trigger>
                  <EditFiltersDropdown
                    size={props.size}
                    availableFields={props.availableFields ?? []}
                    onSaveFilters={(filters) => props.onUpdateFilterGroup(i(), filters)}
                    currentFilters={isFilterGroup(item) ? item.filters : [item]}
                    setOpen={setItemOpen}
                  />
                </Popover>
              );
            }}
          </For>
          <TextField.Input
            placeholder={props.placeholder || "Search"}
            class="grow focus:outline-none min-w-20 ml-1"
          />
        </TextField>
        <Popover open={filterDropdownOpen()} onOpenChange={setFilterDropdownOpen}>
          <Popover.Trigger as={Button} size={props.size} modifier="square">
            <ListFilter class="w-[1em] h-[1em]" />
          </Popover.Trigger>
          <AddFilterDropdown<T>
            size={props.size}
            availableFields={props.availableFields ?? []}
            onAddFilters={props.onAddFilterGroup}
            setOpen={setFilterDropdownOpen}
          />
        </Popover>
        <Show when={props.setSortBy}>
          <Popover>
            <div class="indicator">
              {props.sortBy && <span class="indicator-item status status-success"></span>}
              <Popover.Trigger as={Button} size={props.size} modifier="square">
                <ArrowDown class="w-[1em] h-[1em]" />
              </Popover.Trigger>
            </div>
            <AddSortingDropdown
              size={props.size}
              availableFields={props.availableFields ?? []}
              sortBy={props.sortBy}
              setSortBy={props.setSortBy!}
            />
          </Popover>
        </Show>
      </div>
      {showFieldDropdown() && (
        <div class="absolute left-0 mt-1 w-full dropdown-content rounded-box bg-base-100 shadow-md z-20">
          <ul class="menu w-full">
            <For each={textFields()}>
              {(item) => (
                <li class="menu-item" onClick={() => createTextFilter(item)}>
                  <p class="flex gap-1">
                    <span class="font-bold">{item.label}</span>
                    <span class="italic">Contains</span>
                    <span>'{props.value}'</span>
                  </p>
                </li>
              )}
            </For>
          </ul>
        </div>
      )}
    </div>
  );
};
