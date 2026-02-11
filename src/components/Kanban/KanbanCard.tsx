import { Accessor, JSXElement, createSignal, createEffect, onCleanup } from "solid-js";
import {
  attachClosestEdge,
  extractClosestEdge,
  type Edge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { dropTargetForElements, draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import invariant from "tiny-invariant";
import { tv } from "tailwind-variants";

import { triggerFlash } from "../../methods/triggerFlash";

const itemCard = tv({
  base: "kanban-card card bg-base-100 p-2 rounded-md cursor-pointer hover:shadow-xs transition-shadow",
});

const itemTitle = tv({
  base: "font-medium text-sm",
});

export interface KanbanCardProps<T extends KanbanItem> {
  item: T;
  dragEnabled: Accessor<boolean>;
  flashSignal: Accessor<string | null>;
  onCardClick?: () => void;
  renderItem?: (item: T) => JSXElement;
  class?: string;
}

export const KanbanCard = <T extends KanbanItem>(props: KanbanCardProps<T>) => {
  let ref!: HTMLDivElement;
  const [dragging, setDragging] = createSignal<DraggingState>("idle");
  const [closestEdge, setClosestEdge] = createSignal<Edge | null>();

  createEffect(() => {
    if (props.flashSignal?.() === props.item.id && ref) {
      triggerFlash(ref);
    }
  });

  createEffect(() => {
    if (!props.dragEnabled()) return;

    const element = ref;
    invariant(element);

    const dispose = dropTargetForElements({
      element,
      canDrop({ source }) {
        // not allowing dropping on yourself
        if (source.element === element) {
          return false;
        }
        if (!source.data.item) {
          return false;
        }
        // only allowing same collection for now to be dropped on me
        return (source.data.item as T).collectionId == props.item.collectionId && !!source.data.isKanbanCard;
      },
      getIsSticky() {
        return true;
      },
      getData({ input }) {
        return attachClosestEdge(
          {
            item: props.item,
            isKanbanCard: true,
          },
          { element, input, allowedEdges: ["top", "bottom"] },
        );
      },
      onDragEnter({ self }) {
        const _closestEdge = extractClosestEdge(self.data);
        setDragging("dragging-over");
        setClosestEdge(_closestEdge);
      },
      onDrag({ self }) {
        const _closestEdge = extractClosestEdge(self.data);
        // Only need to update state if nothing has changed.
        if (dragging() !== "dragging-over" || _closestEdge !== closestEdge()) {
          setDragging("dragging-over");
          setClosestEdge(_closestEdge);
        }
      },
      onDragLeave() {
        setDragging("idle");
      },
      onDrop() {
        setDragging("idle");
      },
    });

    onCleanup(dispose);
  });

  createEffect(() => {
    if (!props.dragEnabled()) return;

    const element = ref;
    invariant(element);

    const dispose = draggable({
      element,
      getInitialData() {
        return {
          item: props.item,
          isKanbanCard: true,
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

  return (
    <div
      data-drop-edge={dragging() === "dragging-over" ? (closestEdge() ?? undefined) : undefined}
      style={{ opacity: dragging() == "dragging" ? 0.2 : 1 }}
      ref={ref}
      class={itemCard({ class: props.class })}
      onClick={props.onCardClick}
    >
      {props.renderItem ? props.renderItem(props.item) : <div class={itemTitle()}>{props.item.title}</div>}
    </div>
  );
};

export default KanbanCard;
