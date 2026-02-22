import { Popover } from "@kobalte/core/popover";
import Plus from "lucide-solid/icons/plus";

import { Filter, FilterField } from "./FilterBar";
import FiltersEdit from "./FiltersEdit";

interface EditFiltersDropdownProps<T> {
  availableFields: FilterField<T>[];
  onSaveFilters: (filters: Filter<T>[]) => void;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  setOpen: (v: boolean) => void;
  currentFilters: Filter<T>[];
}

export const EditFiltersDropdown = <T,>(props: EditFiltersDropdownProps<T>) => {
  const handleSaveFilters = (filters: Filter<T>[]) => {
    props.onSaveFilters(filters);
    props.setOpen(false);
  };

  return (
    <Popover.Portal>
      <Popover.Content class="dropdown-content mt-1 rounded-box bg-base-200 shadow-md z-20 p-3">
        <FiltersEdit
          addConditionTrigger={
            <>
              <Plus class="h-[1em] w-[1em]" /> <span>Condition</span>
            </>
          }
          saveTrigger={<span>Save</span>}
          size={props.size}
          availableFields={props.availableFields}
          filters={props.currentFilters}
          onSaveFilters={handleSaveFilters}
        />
      </Popover.Content>
    </Popover.Portal>
  );
};

export default EditFiltersDropdown;
