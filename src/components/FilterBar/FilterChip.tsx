import { createEffect, createMemo, createSignal, For, onCleanup } from "solid-js";
import { attachClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { dropTargetForElements, draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import invariant from "tiny-invariant";
import CloseIcon from "lucide-solid/icons/x";
import { tv } from "tailwind-variants";

import { Filter, FilterGroup, filterLabels } from "./FilterBar";
import { Button } from "../Button";

interface FilterChipOrGroupProps<T> {
  onGroupDrag: (sourceInd: number, targetInd: number, sourceFilterGroupInd?: number) => void;
  onDelete?: () => void;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  class?: string;
}

interface FilterChipProps<T> extends FilterChipOrGroupProps<T> {
  onClick?: (filter: Filter<T>) => void;
  filter: Filter<T>;
  isInGroup?: boolean;
}

const filterChip = tv({
  base: "badge badge-neutral badge-soft cursor-pointer",
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

export const FilterChip = <T,>(props: FilterChipProps<T>) => {
  let ref!: HTMLDivElement;
  const [dragging, setDragging] = createSignal<DraggingState>("idle");

  const filterOperator = createMemo(() => {
    return filterLabels[props.filter.field.type][props.filter.operator] || "has";
  });

  const valueLabel = createMemo(() => {
    let val = props.filter.value;
    if (val === null) return "";

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
        } else {
          let valText = val.startDate ? String(val.startDate.toLocaleDateString("en-GB")) : "";

          if (val.endDate) valText += ` - ${val.endDate.toLocaleDateString("en-GB")}`;

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
        // only allowing filter chips to be dropped on me, and only if not in group
        return !!source.data.isFilterChip && !props.isInGroup;
      },
      getData({ input }) {
        return attachClosestEdge(
          {
            filter: props.filter,
            isFilterChip: true,
            isInGroup: props.isInGroup || false,
          },
          { element, input, allowedEdges: [] },
        );
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
        // Extract the source filter from the dragged element
        const sourceFilter = source.data.filter as Filter<T>;
        const targetFilter = props.filter;

        // Call the callback to create a group
        props.onGroupDrag?.(sourceFilter, targetFilter);
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
          filter: props.filter,
          isFilterChip: true,
          isInGroup: props.isInGroup || false,
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

  return (
    <div
      class={filterChip({ size: props.size, class: props.class })}
      ref={ref}
      style={{ opacity: dragging() === "dragging" ? 0.2 : 1, ...bgStyle() }}
    >
      <p>
        <span class="font-bold">{String(props.filter.field.label)}</span>
        <span class="mx-1">{filterOperator()}</span>
        {valueLabel() && <span>{valueLabel()}</span>}
      </p>
      {props.onDelete && (
        <Button onClick={props.onDelete} size="xs" variant="ghost" class="p-0.5 m-0 h-min">
          <CloseIcon class="w-[1em] h-[1em]" stroke-width={4} />
        </Button>
      )}
    </div>
  );
};

interface FilterGroupProps<T> extends FilterChipOrGroupProps<T> {
  filterGroup: FilterGroup<T>;
  onClick?: (filterGroup: FilterGroup<T>) => void;
}

const filterGroupChip = tv({
  base: "badge badge-neutral badge-soft cursor-pointer pl-0 pr-1 gap-0.5",
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

export const FilterGroupChip = <T,>(props: FilterGroupProps<T>) => {
  return (
    <div class={filterGroupChip({ size: props.size })}>
      <For each={props.filterGroup.filters}>
        {(filter, ind) => (
          <>
            {ind() > 0 && <span class="italic mx-0.5">Or</span>}
            <FilterChip<T>
              filter={filter}
              onGroupCreate={props.onGroupDrag}
              class="badge-primary"
              isInGroup={true}
            />
          </>
        )}
      </For>
      <Button onClick={props.onDelete} size="xs" variant="ghost" class="p-0.5 m-0 h-min">
        <CloseIcon class="w-[1em] h-[1em]" stroke-width={4} />
      </Button>
    </div>
  );
};

export default FilterChip;
