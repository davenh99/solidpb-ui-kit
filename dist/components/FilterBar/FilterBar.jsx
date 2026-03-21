import { createEffect, createMemo, createSignal, For, Match, onCleanup, Show, Switch, } from "solid-js";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { TextField } from "@kobalte/core/text-field";
import { tv } from "tailwind-variants";
import Search from "lucide-solid/icons/search";
import ListFilter from "lucide-solid/icons/list-filter";
import Plus from "lucide-solid/icons/plus";
import Sparkles from "lucide-solid/icons/sparkles";
import ArrowDown from "lucide-solid/icons/arrow-down-narrow-wide";
import Save from "lucide-solid/icons/save";
import invariant from "tiny-invariant";
import { AdvancedFilterChip, FilterChip, FilterGroupChip } from "./FilterChip";
import AddFilter from "./AddFilter";
import AddSortingDropdown from "./AddSortingDropdown";
import EditFilters from "./EditFilters";
import { DropdownMenu } from "../DropdownMenu";
import { Modal } from "../Modal";
import EditAdvancedFilter from "./EditAdvancedFilter";
import { Button } from "../Button";
import { Input } from "../Input";
export const filterDefaults = {
    text: "~",
    bool: "=",
    number: "=",
    select: "=",
    date: ">",
};
export const filterLabels = {
    text: {
        "~": "Contains",
        // "~*": "Fuzzy contains",
        // "~": "Contains (strict)",
        "!~": "Doesn't contain",
        "=": "Is",
        "!=": "Is not",
    },
    bool: {
        "=": "Is",
    },
    number: {
        "=": "Is",
        ">": "Is greater than",
        "<": "Is less than",
        "!=": "Is not",
    },
    select: {
        "=": "Is",
        "!=": "Is not",
        "~": "Contains",
        "!~": "Doesn't contain",
    },
    date: {
        ">": "Is after",
        "<": "Is before",
        "=": "Is",
        "!=": "Is not",
    },
};
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
export const FilterBar = (props) => {
    let ref;
    const [dragging, setDragging] = createSignal("idle");
    const [filterDropdownOpen, setFilterDropdownOpen] = createSignal(false);
    const [saveFilterPresetOpen, setSaveFilterPresetOpen] = createSignal(false);
    const [filterPresetName, setFilterPresetName] = createSignal("");
    const [advancedFilterDropdownOpen, setAdvancedFilterDropdownOpen] = createSignal(false);
    const [showFieldDropdown, setShowFieldDropdown] = createSignal(false);
    const textFields = createMemo(() => props.availableFields?.filter((f) => f.type === "text"));
    const handleTextValueChange = (val) => {
        setFocusedIndex(-1); // reset on type
        props.onChangeValue?.(val);
        setShowFieldDropdown(!!val);
    };
    const createTextFilter = (field) => {
        const newFilter = {
            field,
            operator: "~",
            value: props.value,
        };
        props.onAddFilterGroup([newFilter]);
        handleTextValueChange("");
    };
    const getFilterType = (item) => {
        if ("filter" in item)
            return "advanced";
        if ("filters" in item)
            return "group";
        return "filter";
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
                if (location.current.dropTargets[0].element !== ref)
                    return;
                props.onGroupDrag(source.data.index, -1, source.data.groupIndex);
            },
        });
        onCleanup(dispose);
    });
    const [focusedIndex, setFocusedIndex] = createSignal(-1);
    const handleKeyDown = (e) => {
        const fields = textFields() ?? [];
        if (!showFieldDropdown() || fields.length === 0)
            return;
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setFocusedIndex((i) => Math.min(i + 1, fields.length - 1));
        }
        else if (e.key === "ArrowUp") {
            e.preventDefault();
            setFocusedIndex((i) => Math.max(i - 1, 0));
        }
        else if (e.key === "Enter" && focusedIndex() >= 0) {
            e.preventDefault();
            createTextFilter(fields[focusedIndex()]);
            setFocusedIndex(-1);
        }
        else if (e.key === "Escape") {
            e.preventDefault();
            setShowFieldDropdown(false);
            setFocusedIndex(-1);
        }
    };
    return (<div class={filterBarBase({ class: props.class })}>
      <div class="flex w-full gap-1">
        <Show when={props.leftAction}>{props.leftAction}</Show>
        <div class="join flex flex-1 relative">
          <TextField value={props.value} onChange={handleTextValueChange} class={filterBar({ size: props.size })} onKeyDown={handleKeyDown}>
            <Search class="w-[1em] h-[1em] opacity-90"/>
            <TextField.Input placeholder={props.placeholder || "Search"} class="grow focus:outline-none" onFocusIn={() => setShowFieldDropdown(!!props.value)} onFocusOut={() => setShowFieldDropdown(false)}/>
          </TextField>
          <DropdownMenu>
            <DropdownMenu.Trigger modifier="square" class="join-item">
              <ListFilter class="w-[1em] h-[1em]"/>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <Show when={props.savedFilters && props.savedFilters.length > 0}>
                <For each={props.savedFilters}>
                  {(filter) => (<DropdownMenu.MenuItem onSelect={filter.onApply}>
                      <a>
                        <span>{filter.filter.label}</span>
                      </a>
                    </DropdownMenu.MenuItem>)}
                </For>
                <div class="bg-base-300 w-full h-px my-1"/>
              </Show>
              <DropdownMenu.MenuItem onSelect={() => setFilterDropdownOpen(true)}>
                <a>
                  <Plus class="h-[1em] w-[1em]"/>
                  <span>Add filters</span>
                </a>
              </DropdownMenu.MenuItem>
              <DropdownMenu.MenuItem onSelect={() => setAdvancedFilterDropdownOpen(true)}>
                <a>
                  <Sparkles class="h-[1em] w-[1em]"/>
                  <span>Add Advanced filter</span>
                </a>
              </DropdownMenu.MenuItem>
              <div class="bg-base-300 w-full h-px my-1"/>
              <DropdownMenu.MenuItem onSelect={() => setSaveFilterPresetOpen(true)}>
                <a>
                  <Save class="h-[1em] w-[1em]"/>
                  <span>Save current filters</span>
                </a>
              </DropdownMenu.MenuItem>
            </DropdownMenu.Content>
          </DropdownMenu>
          <Modal title="Save Filter Preset" open={saveFilterPresetOpen()} onOpenChange={setSaveFilterPresetOpen}>
            <Modal.Modal>
              <div class="flex flex-col gap-3">
                <Input value={filterPresetName()} onChange={setFilterPresetName} label="Name" inputProps={{ placeholder: "Name" }}/>
                <Button appearance="success" onClick={() => {
            if (filterPresetName()) {
                props.onSavePreset?.(filterPresetName(), props.items ?? []);
                setSaveFilterPresetOpen(false);
            }
        }}>
                  Save
                </Button>
              </div>
            </Modal.Modal>
          </Modal>
          <Modal title="Add filters" open={filterDropdownOpen()} onOpenChange={setFilterDropdownOpen}>
            <Modal.Modal class="bg-base-200">
              <AddFilter size={props.size} availableFields={props.availableFields ?? []} onAddFilters={(filters) => {
            props.onAddFilterGroup(filters);
            setFilterDropdownOpen(false);
        }}/>
            </Modal.Modal>
          </Modal>
          <Modal title="Add Advanced Filter" open={advancedFilterDropdownOpen()} onOpenChange={setAdvancedFilterDropdownOpen}>
            <Modal.Modal>
              <EditAdvancedFilter size={props.size} onSave={(filter) => {
            props.onAddAdvancedFilter(filter);
            setAdvancedFilterDropdownOpen(false);
        }}/>
            </Modal.Modal>
          </Modal>
          <Show when={props.setSortBy}>
            <DropdownMenu>
              <div class="indicator">
                {props.sortBy && <span class="indicator-item status status-neutral"></span>}
                <DropdownMenu.Trigger size={props.size} modifier="square" class="join-item">
                  <ArrowDown class="w-[1em] h-[1em]"/>
                </DropdownMenu.Trigger>
              </div>
              <AddSortingDropdown size={props.size} availableFields={props.availableFields ?? []} sortBy={props.sortBy} setSortBy={props.setSortBy}/>
            </DropdownMenu>
          </Show>
          {showFieldDropdown() && (<div class="absolute top-full left-0 mt-1 w-full dropdown-content rounded-box bg-base-100 shadow-md z-20">
              <ul class={suggestions({ size: props.size })}>
                <For each={textFields()}>
                  {(item, index) => (<li class="menu-item" classList={{ "bg-base-300 rounded-sm": focusedIndex() === index() }} onMouseDown={(e) => {
                    e.preventDefault(); // prevent input blur
                    createTextFilter(item);
                }} onMouseEnter={() => setFocusedIndex(index())}>
                      <p class="flex gap-1">
                        <span class="font-bold">{item.label}</span>
                        <span class="italic">Contains</span>
                        <span>'{props.value}'</span>
                      </p>
                    </li>)}
                </For>
              </ul>
            </div>)}
        </div>
      </div>
      <div ref={ref} class="w-full flex flex-wrap gap-0.5 mt-1">
        <For each={props.items}>
          {(item, i) => {
            const [itemOpen, setItemOpen] = createSignal(false);
            return (<Modal title="Edit filters" open={itemOpen()} onOpenChange={setItemOpen}>
                <Switch>
                  <Match when={getFilterType(item) === "advanced"}>
                    <Modal.Trigger as={AdvancedFilterChip} index={i()} size={props.size} filter={item} onDelete={() => props.onFilterRemove(i(), item)} setOpen={setItemOpen}/>
                  </Match>
                  <Match when={getFilterType(item) === "filter"}>
                    <Modal.Trigger as={FilterChip} onDelete={() => props.onFilterRemove(i(), item)} filter={item} size={props.size} onGroupDrag={(sourceInd, sourceFilterGroupInd) => props.onGroupDrag(sourceInd, i(), sourceFilterGroupInd)} index={i()} setOpen={setItemOpen}/>
                  </Match>
                  <Match when={getFilterType(item) === "group"}>
                    <Modal.Trigger as={FilterGroupChip} filterGroup={item} size={props.size} onGroupDrag={(sourceInd, sourceFilterGroupInd) => props.onGroupDrag(sourceInd, i(), sourceFilterGroupInd)} index={i()} setOpen={setItemOpen}/>
                  </Match>
                </Switch>
                <Modal.Modal class="bg-base-200">
                  <Show when={getFilterType(item) === "group" || getFilterType(item) === "filter"} fallback={<EditAdvancedFilter size={props.size} filter={item} onSave={(updatedFilter) => {
                        props.onUpdateAdvancedFilter(i(), updatedFilter);
                        setItemOpen(false);
                    }}/>}>
                    <EditFilters size={props.size} availableFields={props.availableFields ?? []} onSaveFilters={(filters) => {
                    props.onUpdateFilterGroup(i(), filters);
                    setItemOpen(false);
                }} currentFilters={getFilterType(item) === "group"
                    ? item.filters
                    : [item]}/>
                  </Show>
                </Modal.Modal>
              </Modal>);
        }}
        </For>
      </div>
    </div>);
};
