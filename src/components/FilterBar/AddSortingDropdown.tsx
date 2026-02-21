import { createMemo, For, Match, Show, Switch } from "solid-js";
import { Popover } from "@kobalte/core/popover";
import CalendarArrowUp from "lucide-solid/icons/calendar-arrow-up";
import CalendarArrowDown from "lucide-solid/icons/calendar-arrow-down";
import ArrowDown01 from "lucide-solid/icons/arrow-down-0-1";
import ArrowUp01 from "lucide-solid/icons/arrow-up-0-1";
import ArrowDownAZ from "lucide-solid/icons/arrow-down-a-z";
import ArrowUpAZ from "lucide-solid/icons/arrow-up-a-z";

import { FilterField, SortOption } from "./FilterBar";
import { iconSize } from "../../constants";

interface AddSortingDropDownProps<T> {
  availableFields: FilterField<T>[];
  sortBy?: SortOption<T>;
  setSortBy: (sort?: SortOption<T>) => void;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export const AddSortingDropdown = <T,>(props: AddSortingDropDownProps<T>) => {
  const validFields = createMemo(() => props.availableFields.filter((f) => f.type !== "bool"));

  return (
    <Popover.Portal>
      <Popover.Content class="dropdown-content rounded-box bg-base-200 shadow-md z-20 min-w-50 outline-none">
        <ul class="menu w-full">
          <For each={validFields()}>
            {(field) => {
              const fieldActive = createMemo(() => field.name === props.sortBy?.field);

              const handleClick = () => {
                if (props.sortBy?.direction === "asc") {
                  // clear
                  props.setSortBy();
                  return;
                }

                props.setSortBy({
                  // will also set to "desc" if no sortby exists
                  direction: props.sortBy?.direction === "desc" ? "asc" : "desc",
                  field: field.name,
                });
              };

              return (
                <li class="menu-item">
                  <a class="flex justify-between" onClick={handleClick}>
                    <span>{field.label}</span>
                    <span style={{ opacity: fieldActive() ? 1 : 0.2 }}>
                      <Switch>
                        <Match when={field.type === "date"}>
                          <Show
                            when={fieldActive() && props.sortBy?.direction === "asc"}
                            fallback={<CalendarArrowDown size={iconSize[props.size ?? "sm"]} />}
                          >
                            <CalendarArrowUp size={iconSize[props.size ?? "sm"]} />
                          </Show>
                        </Match>
                        <Match when={field.type === "text"}>
                          <Show
                            when={fieldActive() && props.sortBy?.direction === "asc"}
                            fallback={<ArrowDownAZ size={iconSize[props.size ?? "sm"]} />}
                          >
                            <ArrowUpAZ size={iconSize[props.size ?? "sm"]} />
                          </Show>
                        </Match>
                        <Match when={field.type === "number"}>
                          <Show
                            when={fieldActive() && props.sortBy?.direction === "asc"}
                            fallback={<ArrowDown01 size={iconSize[props.size ?? "sm"]} />}
                          >
                            <ArrowUp01 size={iconSize[props.size ?? "sm"]} />
                          </Show>
                        </Match>
                        <Match when={field.type === "select"}>
                          <Show
                            when={fieldActive() && props.sortBy?.direction === "asc"}
                            fallback={<ArrowDownAZ size={iconSize[props.size ?? "sm"]} />}
                          >
                            <ArrowUpAZ size={iconSize[props.size ?? "sm"]} />
                          </Show>
                        </Match>
                      </Switch>
                    </span>
                  </a>
                </li>
              );
            }}
          </For>
        </ul>
      </Popover.Content>
    </Popover.Portal>
  );
};

export default AddSortingDropdown;
