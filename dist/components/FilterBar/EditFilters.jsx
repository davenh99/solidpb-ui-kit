import Plus from "lucide-solid/icons/plus";
import FiltersEdit from "./FiltersEdit";
export const EditFilters = (props) => {
    const handleSaveFilters = (filters) => {
        props.onSaveFilters(filters);
        props.setOpen(false);
    };
    return (<FiltersEdit addConditionTrigger={<>
          <Plus class="h-[1em] w-[1em]"/> <span>Condition</span>
        </>} saveTrigger={<span>Save</span>} size={props.size} availableFields={props.availableFields} filters={JSON.parse(JSON.stringify(props.currentFilters))} onSaveFilters={handleSaveFilters} filtersReady/>);
};
export default EditFilters;
