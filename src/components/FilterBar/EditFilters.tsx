import Plus from "lucide-solid/icons/plus";

import { Filter, FilterField } from "./FilterBar";
import FiltersEdit from "./FiltersEdit";

interface EditFiltersProps<T> {
  availableFields: FilterField<T>[];
  onSaveFilters: (filters: Filter<T>[]) => void;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  setOpen: (v: boolean) => void;
  currentFilters: Filter<T>[];
}

export const EditFilters = <T,>(props: EditFiltersProps<T>) => {
  const handleSaveFilters = (filters: Filter<T>[]) => {
    props.onSaveFilters(filters);
    props.setOpen(false);
  };

  return (
    <FiltersEdit
      addConditionTrigger={
        <>
          <Plus class="h-[1em] w-[1em]" /> <span>Condition</span>
        </>
      }
      saveTrigger={<span>Save</span>}
      size={props.size}
      availableFields={props.availableFields}
      filters={JSON.parse(JSON.stringify(props.currentFilters))}
      onSaveFilters={handleSaveFilters}
      filtersReady
    />
  );
};

export default EditFilters;
