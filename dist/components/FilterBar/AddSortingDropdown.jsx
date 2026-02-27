import { createMemo, For, Match, Show, Switch } from "solid-js";
import CalendarArrowUp from "lucide-solid/icons/calendar-arrow-up";
import CalendarArrowDown from "lucide-solid/icons/calendar-arrow-down";
import ArrowDown01 from "lucide-solid/icons/arrow-down-0-1";
import ArrowUp01 from "lucide-solid/icons/arrow-up-0-1";
import ArrowDownAZ from "lucide-solid/icons/arrow-down-a-z";
import ArrowUpAZ from "lucide-solid/icons/arrow-up-a-z";
import { iconSize } from "../../constants";
import { DropdownMenu } from "../DropdownMenu";
export const AddSortingDropdown = (props) => {
    const validFields = createMemo(() => props.availableFields.filter((f) => f.type !== "bool"));
    return (<DropdownMenu.Content>
      <For each={validFields()}>
        {(field) => {
            const fieldActive = createMemo(() => field.name === props.sortBy?.field);
            const handleClick = () => {
                const changingSameField = props.sortBy?.field === field.name;
                if (!changingSameField) {
                    props.setSortBy({
                        direction: "desc",
                        field: field.name,
                    });
                }
                else {
                    props.setSortBy(props.sortBy?.direction === "asc"
                        ? undefined
                        : {
                            // will also set to "desc" if no sortby exists
                            direction: props.sortBy?.direction === "desc" ? "asc" : "desc",
                            field: field.name,
                        });
                }
            };
            return (<DropdownMenu.MenuItem onSelect={handleClick} closeOnSelect={false}>
              <a class="flex justify-between">
                <span>{field.label}</span>
                <span style={{ opacity: fieldActive() ? 1 : 0.2 }}>
                  <Switch>
                    <Match when={field.type === "date"}>
                      <Show when={fieldActive() && props.sortBy?.direction === "asc"} fallback={<CalendarArrowDown size={iconSize[props.size ?? "sm"]}/>}>
                        <CalendarArrowUp size={iconSize[props.size ?? "sm"]}/>
                      </Show>
                    </Match>
                    <Match when={field.type === "text"}>
                      <Show when={fieldActive() && props.sortBy?.direction === "asc"} fallback={<ArrowDownAZ size={iconSize[props.size ?? "sm"]}/>}>
                        <ArrowUpAZ size={iconSize[props.size ?? "sm"]}/>
                      </Show>
                    </Match>
                    <Match when={field.type === "number"}>
                      <Show when={fieldActive() && props.sortBy?.direction === "asc"} fallback={<ArrowDown01 size={iconSize[props.size ?? "sm"]}/>}>
                        <ArrowUp01 size={iconSize[props.size ?? "sm"]}/>
                      </Show>
                    </Match>
                    <Match when={field.type === "select"}>
                      <Show when={fieldActive() && props.sortBy?.direction === "asc"} fallback={<ArrowDownAZ size={iconSize[props.size ?? "sm"]}/>}>
                        <ArrowUpAZ size={iconSize[props.size ?? "sm"]}/>
                      </Show>
                    </Match>
                  </Switch>
                </span>
              </a>
            </DropdownMenu.MenuItem>);
        }}
      </For>
    </DropdownMenu.Content>);
};
export default AddSortingDropdown;
