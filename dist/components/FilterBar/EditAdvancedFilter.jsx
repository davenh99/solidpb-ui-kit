import { createSignal } from "solid-js";
import { Input } from "../Input";
import { Button } from "../Button";
export const EditAdvancedFilter = (props) => {
    const [filter, setFilter] = createSignal(props.filter ?? { filter: "", label: "Filter" });
    return (<div class="flex flex-col gap-2 sm:min-w-150">
      <Input label="Filter Name" value={filter().label} onChange={(v) => setFilter({ ...filter(), label: v })}/>
      <Input label="Expression" inputProps={{ placeholder: "Expression", class: "w-full" }} value={filter().filter} onChange={(v) => setFilter({ ...filter(), filter: v })} size={props.size}/>
      <div class="flex justify-end">
        <Button appearance="success" onClick={() => props.onSave(filter())}>
          Save
        </Button>
      </div>
    </div>);
};
export default EditAdvancedFilter;
