import { createEffect, createMemo, createSignal, For, JSXElement, onCleanup, Show } from "solid-js";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { TextField } from "@kobalte/core/text-field";
import { tv } from "tailwind-variants";
import Search from "lucide-solid/icons/search";
import ListFilter from "lucide-solid/icons/list-filter";
import ArrowDown from "lucide-solid/icons/arrow-down-narrow-wide";
import invariant from "tiny-invariant";

import { FilterChip, FilterGroupChip } from "./FilterChip";
import AddFilter from "./AddFilter";
import AddSortingDropdown from "./AddSortingDropdown";
import EditFilters from "./EditFilters";
import { DropdownMenu } from "../DropdownMenu";
import { Modal } from "../Modal";
import { Button } from "../Button";

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
  leftAction?: JSXElement;

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

const filterBarBase = tv({
  base: "relative flex flex-col not-sm:w-screen",
});

const filterBar = tv({
  base: "input outline-offset-0 join-item flex-1",
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

const suggestions = tv({
  base: "menu w-full",
  variants: {
    size: {
      xs: "menu-xs",
      sm: "menu-sm",
      md: "menu-md",
      lg: "menu-lg",
      xl: "menu-xl",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

export const FilterBar = <T,>(props: FilterBarProps<T>) => {
  let ref!: HTMLDivElement;
  const [dragging, setDragging] = createSignal<DraggingState>("idle");
  const [filterDropdownOpen, setFilterDropdownOpen] = createSignal(false);
  const [showFieldDropdown, setShowFieldDropdown] = createSignal(false);
  const textFields = createMemo(() => props.availableFields?.filter((f) => f.type === "text"));

  const handleTextValueChange = (val: string) => {
    setFocusedIndex(-1); // reset on type
    props.onChangeValue?.(val);
    setShowFieldDropdown(!!val);
  };

  const createTextFilter = (field: FilterField<T>) => {
    const newFilter: Filter<T> = {
      field,
      operator: "loose_contains",
      value: props.value,
    };

    props.onAddFilterGroup([newFilter]);
    handleTextValueChange("");
  };

  const isFilterGroup = (item: Filter<T> | FilterGroup<T>): item is FilterGroup<T> => {
    return "filters" in item;
  };

  createEffect(() => {
    const element = ref;
    invariant(element);

    const dispose = dropTargetForElements({
      element,
      canDrop({ source }) {
        if (source.element === element) {
          return false;
        }
        return !!source.data.isFilterChip || !!source.data.isFilterGroupChip;
      },
      onDragEnter() {
        setDragging("dragging-over");
      },
      onDrag() {
        if (dragging() !== "dragging-over") {
          setDragging("dragging-over");
        }
      },
      onDragLeave() {
        setDragging("idle");
      },
      onDrop({ source, location }) {
        setDragging("idle");
        if (location.current.dropTargets[0].element !== ref) return;

        props.onGroupDrag(source.data.index as number, -1, source.data.groupIndex as number | undefined);
      },
    });

    onCleanup(dispose);
  });

  const [focusedIndex, setFocusedIndex] = createSignal(-1);

  const handleKeyDown = (e: KeyboardEvent) => {
    const fields = textFields() ?? [];
    if (!showFieldDropdown() || fields.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((i) => Math.min(i + 1, fields.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && focusedIndex() >= 0) {
      e.preventDefault();
      createTextFilter(fields[focusedIndex()]);
      setFocusedIndex(-1);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setShowFieldDropdown(false);
      setFocusedIndex(-1);
    }
  };

  return (
    <div class={filterBarBase({ class: props.class })}>
      <div class="flex w-full gap-1">
        <Show when={props.leftAction}>{props.leftAction}</Show>
        <div class="join flex flex-1 relative">
          <TextField
            value={props.value}
            onChange={handleTextValueChange}
            class={filterBar({ size: props.size })}
            onKeyDown={handleKeyDown}
          >
            <Search class="w-[1em] h-[1em] opacity-90" />
            <TextField.Input
              placeholder={props.placeholder || "Search"}
              class="grow focus:outline-none"
              onFocusIn={() => setShowFieldDropdown(!!props.value)}
              onFocusOut={() => setShowFieldDropdown(false)}
            />
          </TextField>
          <Modal title="Add filters" open={filterDropdownOpen()} onOpenChange={setFilterDropdownOpen}>
            <Modal.Trigger as={Button} modifier="square" class="join-item">
              <ListFilter class="w-[1em] h-[1em]" />
            </Modal.Trigger>
            <Modal.Modal class="bg-base-200">
              <AddFilter<T>
                size={props.size}
                availableFields={props.availableFields ?? []}
                onAddFilters={props.onAddFilterGroup}
                setOpen={setFilterDropdownOpen}
              />
            </Modal.Modal>
          </Modal>
          <Show when={props.setSortBy}>
            <DropdownMenu>
              <div class="indicator">
                {props.sortBy && <span class="indicator-item status status-neutral"></span>}
                <DropdownMenu.Trigger size={props.size} modifier="square" class="join-item">
                  <ArrowDown class="w-[1em] h-[1em]" />
                </DropdownMenu.Trigger>
              </div>
              <AddSortingDropdown
                size={props.size}
                availableFields={props.availableFields ?? []}
                sortBy={props.sortBy}
                setSortBy={props.setSortBy!}
              />
            </DropdownMenu>
          </Show>
          {showFieldDropdown() && (
            <div class="absolute top-full left-0 mt-1 w-full dropdown-content rounded-box bg-base-100 shadow-md z-20">
              <ul class={suggestions({ size: props.size })}>
                <For each={textFields()}>
                  {(item, index) => (
                    <li
                      class="menu-item"
                      classList={{ "bg-base-300 rounded-sm": focusedIndex() === index() }}
                      onMouseDown={(e) => {
                        e.preventDefault(); // prevent input blur
                        createTextFilter(item);
                      }}
                      onMouseEnter={() => setFocusedIndex(index())}
                    >
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
      </div>
      <div ref={ref} class="w-full flex flex-wrap gap-0.5 mt-1">
        <For each={props.items}>
          {(item, i) => {
            const [itemOpen, setItemOpen] = createSignal(false);

            return (
              <Modal title="Edit filters" open={itemOpen()} onOpenChange={setItemOpen}>
                <Show
                  when={isFilterGroup(item)}
                  fallback={
                    <Modal.Trigger
                      as={FilterChip<T>}
                      onDelete={() => props.onFilterRemove(i(), item as Filter<T>)}
                      filter={item as Filter<T>}
                      size={props.size}
                      onGroupDrag={(sourceInd, sourceFilterGroupInd) =>
                        props.onGroupDrag(sourceInd, i(), sourceFilterGroupInd)
                      }
                      index={i()}
                      setOpen={setItemOpen}
                    />
                  }
                >
                  <Modal.Trigger
                    as={FilterGroupChip<T>}
                    filterGroup={item as FilterGroup<T>}
                    size={props.size}
                    onGroupDrag={(sourceInd, sourceFilterGroupInd) =>
                      props.onGroupDrag(sourceInd, i(), sourceFilterGroupInd)
                    }
                    index={i()}
                    setOpen={setItemOpen}
                  />
                </Show>
                <Modal.Modal class="bg-base-200">
                  <EditFilters
                    size={props.size}
                    availableFields={props.availableFields ?? []}
                    onSaveFilters={(filters) => props.onUpdateFilterGroup(i(), filters)}
                    currentFilters={isFilterGroup(item) ? item.filters : [item]}
                    setOpen={setItemOpen}
                  />
                </Modal.Modal>
              </Modal>
            );
          }}
        </For>
      </div>
    </div>
  );
};
