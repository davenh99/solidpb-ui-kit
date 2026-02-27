import Plus from "lucide-solid/icons/plus";
import FiltersEdit from "./FiltersEdit";
export const AddFilter = (props) => {
    const handleSaveFilters = (filters) => {
        props.onAddFilters(filters);
        props.setOpen(false);
    };
    return (<FiltersEdit addConditionTrigger={<>
          <Plus class="h-[1em] w-[1em]"/> <span>Condition</span>
        </>} saveTrigger={<>
          <Plus class="h-[1em] w-[1em]"/> <span>Add</span>
        </>} size={props.size} availableFields={props.availableFields} filters={[{}]} onSaveFilters={handleSaveFilters}/>);
};
export default AddFilter;
