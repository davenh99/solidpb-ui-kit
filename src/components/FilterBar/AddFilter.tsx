import Plus from "lucide-solid/icons/plus";

import { Filter, FilterField } from "./FilterBar";
import FiltersEdit from "./FiltersEdit";

interface AddFilterProps<T> {
  availableFields: FilterField<T>[];
  onAddFilters: (filters: Filter<T>[]) => void;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  setOpen: (v: boolean) => void;
}

export const AddFilter = <T,>(props: AddFilterProps<T>) => {
  const handleSaveFilters = (filters: Filter<T>[]) => {
    props.onAddFilters(filters);
    props.setOpen(false);
  };

  return (
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
  );
};

export default AddFilter;
