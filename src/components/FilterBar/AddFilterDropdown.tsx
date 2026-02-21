import { Popover } from "@kobalte/core/popover";
import Plus from "lucide-solid/icons/plus";

import { Filter, FilterField } from "./FilterBar";
import FiltersEdit from "./FiltersEdit";

interface AddFilterDropdownProps<T> {
  availableFields: FilterField<T>[];
  onAddFilters: (filters: Filter<T>[]) => void;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  setOpen: (v: boolean) => void;
}

export const AddFilterDropdown = <T,>(props: AddFilterDropdownProps<T>) => {
  const handleSaveFilters = (filters: Filter<T>[]) => {
    props.onAddFilters(filters);
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
          saveTrigger={
            <>
              <Plus class="h-[1em] w-[1em]" /> <span>Add</span>
            </>
          }
          size={props.size}
          availableFields={props.availableFields}
          filters={[{}]}
          onSaveFilters={handleSaveFilters}
        />
      </Popover.Content>
    </Popover.Portal>
  );
};

export default AddFilterDropdown;
