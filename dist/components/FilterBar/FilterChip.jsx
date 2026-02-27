import { createEffect, createMemo, createSignal, For, onCleanup } from "solid-js";
import { dropTargetForElements, draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import invariant from "tiny-invariant";
import CloseIcon from "lucide-solid/icons/x";
import { tv } from "tailwind-variants";
import { filterLabels } from "./FilterBar";
import { Button } from "../Button";
const filterChip = tv({
    base: "badge badge-soft cursor-pointer",
    variants: {
        size: {
            xs: "badge-xs",
            sm: "badge-sm",
            md: "badge-md",
            lg: "badge-lg",
            xl: "badge-xl",
        },
    },
});
export const FilterChip = (props) => {
    let ref;
    const [dragging, setDragging] = createSignal("idle");
    const filterOperator = createMemo(() => {
        return filterLabels[props.filter.field.type][props.filter.operator] || "has";
    });
    const valueLabel = createMemo(() => {
        let val = props.filter.value;
        if (val === null)
            return "";
        switch (typeof val) {
            case "boolean":
                return val ? "True" : "False";
            case "number":
                return String(val);
            case "string":
                return val;
            case "object":
                if ("label" in val) {
                    return val.label;
                }
                else {
                    let valText = val.startDate ? String(val.startDate.toLocaleDateString("en-GB")) : "";
                    if (val.endDate)
                        valText += ` - ${val.endDate.toLocaleDateString("en-GB")}`;
                    return valText;
                }
        }
    });
    createEffect(() => {
        const element = ref;
        invariant(element);
        const dispose = dropTargetForElements({
            element,
            canDrop({ source }) {
                // not allowing dropping on yourself
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
            onDrop({ source }) {
                setDragging("idle");
                if (source.data.index === props.index)
                    return;
                // add the target ind and group source ind if it exists
                props.onGroupDrag(source.data.index, source.data.groupIndex);
            },
        });
        onCleanup(dispose);
    });
    createEffect(() => {
        const element = ref;
        invariant(element);
        const dispose = draggable({
            element,
            getInitialData() {
                return {
                    isFilterChip: true,
                    index: props.index,
                    isInGroup: props.isInGroup || false,
                    groupIndex: props.groupIndex,
                };
            },
            onDragStart() {
                setDragging("dragging");
            },
            onDrop() {
                setDragging("idle");
            },
        });
        onCleanup(() => dispose());
    });
    const bgStyle = createMemo(() => {
        if (dragging() === "dragging-over") {
            return { "background-color": "color-mix(in srgb, var(--color-primary) 10%, transparent)" };
        }
        return {};
    });
    return (<div class={filterChip({ size: props.size, class: props.class })} ref={ref} style={{ opacity: dragging() === "dragging" ? 0.2 : 1, ...bgStyle() }} onClick={() => props.setOpen?.((prev) => !prev)}>
      <div class="not-sm:tooltip not-sm:tooltip-bottom not-sm:tooltip-neutral">
        <span class="font-bold">{String(props.filter.field.label)}</span>
        <span class="mx-1 hidden sm:inline">{filterOperator()}</span>
        {valueLabel() && <span class="hidden sm:inline">{valueLabel()}</span>}
        <div class="inline sm:hidden tooltip-content">
          <span class="font-bold">{String(props.filter.field.label)}</span>
          <span class="mx-1 inline sm:hidden">{filterOperator()}</span>
          {valueLabel() && <span class="inline sm:hidden">{valueLabel()}</span>}
        </div>
      </div>
      {props.onDelete && (<Button onClick={props.onDelete} size="xs" variant="ghost" class="p-0.5 m-0 h-min">
          <CloseIcon class="w-[1em] h-[1em]" stroke-width={4}/>
        </Button>)}
    </div>);
};
const filterGroupChip = tv({
    base: "badge badge-soft cursor-pointer pl-0 pr-1 gap-0.5",
    variants: {
        size: {
            xs: "badge-xs",
            sm: "badge-sm",
            md: "badge-md",
            lg: "badge-lg",
            xl: "badge-xl",
        },
    },
});
export const FilterGroupChip = (props) => {
    let ref;
    const [dragging, setDragging] = createSignal("idle");
    const extraCount = () => props.filterGroup.filters.length - 1;
    createEffect(() => {
        const element = ref;
        invariant(element);
        const dispose = dropTargetForElements({
            element,
            canDrop({ source }) {
                // not allowing dropping on yourself
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
                // add the target ind and group source ind if it exists
                props.onGroupDrag(source.data.index, source.data.groupIndex);
            },
        });
        onCleanup(dispose);
    });
    createEffect(() => {
        const element = ref;
        invariant(element);
        const dispose = draggable({
            element,
            getInitialData() {
                return {
                    isFilterGroupChip: true,
                    isInGroup: false,
                    index: props.index,
                };
            },
            onDragStart() {
                setDragging("dragging");
            },
            onDrop() {
                setDragging("idle");
            },
        });
        onCleanup(dispose);
    });
    const bgStyle = createMemo(() => {
        if (dragging() === "dragging-over") {
            return { "background-color": "color-mix(in srgb, var(--color-primary) 10%, transparent)" };
        }
        return {};
    });
    return (<div ref={ref} class={filterGroupChip({ size: props.size })} style={{ opacity: dragging() === "dragging" ? 0.2 : 1, ...bgStyle() }} onClick={() => props.setOpen?.((prev) => !prev)}>
      <FilterChip filter={props.filterGroup.filters[0]} onGroupDrag={props.onGroupDrag} isInGroup={true} groupIndex={0} index={props.index}/>
      <For each={props.filterGroup.filters.slice(1)}>
        {(filter, ind) => (<>
            <span class="italic mx-0.5 hidden sm:inline">Or</span>
            <div class="hidden sm:contents">
              <FilterChip filter={filter} onGroupDrag={props.onGroupDrag} isInGroup={true} groupIndex={ind()} index={props.index}/>
            </div>
          </>)}
      </For>

      <span class="sm:hidden badge badge-ghost badge-xs">+{extraCount()} more</span>

      <Button onClick={props.onDelete} size="xs" variant="ghost" class="p-0.5 m-0 h-min">
        <CloseIcon class="w-[1em] h-[1em]" stroke-width={4}/>
      </Button>
    </div>);
};
export default FilterChip;
