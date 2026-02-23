import { createEffect, createMemo, createSignal, For, onCleanup, Show } from "solid-js";
import { dropTargetForElements, draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { Popover } from "@kobalte/core/popover";
import invariant from "tiny-invariant";
import CloseIcon from "lucide-solid/icons/x";
import { tv } from "tailwind-variants";

import { Filter, FilterField, FilterGroup, filterLabels } from "./FilterBar";
import { Button } from "../Button";
import { EditFiltersDropdown } from "./EditFiltersDropdown";

interface FilterChipOrGroupProps {
  onGroupDrag: (targetInd: number, sourceFilterGroupInd?: number) => void;
  onDelete?: () => void;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  class?: string;
  index: number;
}

interface FilterChipProps<T> extends FilterChipOrGroupProps {
  onClick?: (filter: Filter<T>) => void;
  filter: Filter<T>;
  isInGroup?: boolean;
  groupIndex?: number;
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
      onDrop() {
        setDragging("idle");
        // add the target ind
        props.onGroupDrag(props.index);
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

interface FilterGroupProps<T> extends FilterChipOrGroupProps {
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
  let ref!: HTMLDivElement;
  const [dragging, setDragging] = createSignal<DraggingState>("idle");

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
        const sourceFilterGroupIndex = source.data.groupIndex as number | undefined;

        // add the target ind and group source ind if it exists
        props.onGroupDrag(props.index, sourceFilterGroupIndex);
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

  return (
    <div
      ref={ref}
      class={filterGroupChip({ size: props.size })}
      style={{ opacity: dragging() === "dragging" ? 0.2 : 1, ...bgStyle() }}
    >
      <For each={props.filterGroup.filters}>
        {(filter, ind) => (
          <>
            {ind() > 0 && <span class="italic mx-0.5">Or</span>}
            <FilterChip<T>
              filter={filter}
              onGroupDrag={props.onGroupDrag}
              class="badge-primary"
              isInGroup={true}
              groupIndex={ind()}
              index={-1}
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

interface DraggableChipProps<T> extends FilterChipOrGroupProps {
  item: Filter<T> | FilterGroup<T>;
  availableFields: FilterField<T>[];
  onSaveFilters: (filters: Filter<T>[]) => void;
  isFilterGroup: boolean;
  onDelete: () => void;
}

// this will have drag handlers, and dropdown here
export const DraggableChip = <T,>(props: DraggableChipProps<T>) => {
  let ref!: HTMLDivElement;
  const [itemOpen, setItemOpen] = createSignal(false);
  const [dragging, setDragging] = createSignal<DraggingState>("idle");

  const bgStyle = createMemo(() => {
    if (dragging() === "dragging-over") {
      return { "background-color": "color-mix(in srgb, var(--color-primary) 10%, transparent)" };
    }
    return {};
  });

  return (
    <Popover open={itemOpen()} onOpenChange={setItemOpen}>
      <Popover.Trigger>
        <Show
          when={props.isFilterGroup}
          fallback={
            <FilterChip<T>
              onDelete={props.onDelete}
              filter={props.item as Filter<T>}
              size={props.size}
              // onGroupDrag={(targetInd) => props.onGroupDrag(props.index, targetInd)}
              // index={props.index}
            />
          }
        >
          <FilterGroupChip<T>
            filterGroup={props.item as FilterGroup<T>}
            onDelete={props.onDelete}
            size={props.size}
            // onGroupDrag={(targetInd, sourceFilterGroupInd) =>
            //   props.onGroupDrag(props.index, targetInd, sourceFilterGroupInd)
            // }
            // index={props.index}
          />
        </Show>
      </Popover.Trigger>
      <EditFiltersDropdown
        size={props.size}
        availableFields={props.availableFields}
        onSaveFilters={props.onSaveFilters}
        currentFilters={
          props.isFilterGroup ? (props.item as FilterGroup<T>).filters : [props.item as Filter<T>]
        }
        setOpen={setItemOpen}
      />
    </Popover>
  );
};

export default DraggableChip;
