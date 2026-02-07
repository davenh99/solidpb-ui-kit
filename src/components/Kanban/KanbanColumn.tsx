import { Accessor, JSXElement, createSignal, createMemo, createEffect, onCleanup, Show, For } from "solid-js";
import {
  attachClosestEdge,
  extractClosestEdge,
  type Edge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import {
  dropTargetForElements,
  draggable,
  monitorForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import Fold from "lucide-solid/icons/fold-horizontal";
import UnFold from "lucide-solid/icons/unfold-horizontal";
import Plus from "lucide-solid/icons/plus";
import invariant from "tiny-invariant";
import { tv } from "tailwind-variants";

import { triggerFlash } from "../../methods/triggerFlash";
import { iconSize } from "../../constants";
import { Button } from "../Button";
import { KanbanCard } from "./KanbanCard";

const column = tv({
  base: "kanban-column flex flex-col gap-1 flex-shrink-0 bg-base-300 p-1.5 rounded-md transition-[width] text-nowrap",
  variants: {
    folded: {
      true: "w-9",
      false: "w-70",
    },
  },
  defaultVariants: {
    folded: false,
  },
});

const columnHeader = tv({
  base: "font-semibold text-sm sticky top-0 pb-1",
  variants: {
    folded: {
      true: "flex flex-col",
      false: "flex justify-between",
    },
  },
  defaultVariants: {
    folded: false,
  },
});

const columnContent = tv({
  base: "flex flex-col gap-1.5",
});

export interface KanbanColumnProps<T extends KanbanItem, K extends KanbanState> {
  col: K;
  items: T[];
  dragEnabled: Accessor<boolean>;
  class?: string;
  cardClass?: string;
  onCardClick?: (item: T) => void;
  renderItem?: (item: T) => JSXElement;
  onCreateItem?: (item: T) => void;
  onReorderCard?: (item: T, oldPos: number, newPos: number, oldState: string, newState: string) => void;
  onCollapse?: (collapsed: boolean) => void;
}

export const KanbanColumn = <T extends KanbanItem, K extends KanbanState>(props: KanbanColumnProps<T, K>) => {
  let ref!: HTMLDivElement;
  const [dragging, setDragging] = createSignal<DraggingState>("idle");
  const [closestEdge, setClosestEdge] = createSignal<Edge | null>();
  const [folded, setFolded] = createSignal(false);
  const itemDragEnabled = createMemo(() => {
    const data = props.items;
    return !!data && data.length > 0 && "kanbanPosition" in data[0];
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
        // only allowing same collection for now to be dropped on me
        return source.data.collectionId == props.col.collectionId && !!source.data.isKanbanColumn;
      },
      getIsSticky() {
        return true;
      },
      getData({ input }) {
        return attachClosestEdge(
          {
            id: props.col.id,
            ind: props.col.statePosition,
            collectionId: props.col.collectionId,
            isKanbanColumn: true,
          },
          { element, input, allowedEdges: ["left", "right"] },
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
          id: props.col.id,
          ind: props.col.statePosition,
          collectionId: props.col.collectionId,
          isKanbanColumn: true,
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

  createEffect(() => {
    if (!props.items.length || !itemDragEnabled()) return;

    const dispose = monitorForElements({
      canMonitor({ source }) {
        return source.data.collectionId == props.items[0].collectionId && !!source.data.isKanbanCard;
      },
      onDrop({ location, source }) {
        const target = location.current.dropTargets[0];
        if (!target) {
          return;
        }

        const sourceData = source.data;
        const targetData = target.data;

        if (sourceData.collectionId !== targetData.collectionId) {
          return;
        }

        if ((sourceData.ind as number) < 0 || (targetData.ind as number) < 0) {
          return;
        }

        const closestEdgeOfTarget = extractClosestEdge(targetData);

        const newInd =
          closestEdgeOfTarget === "top" ? (targetData.ind as number) : (targetData.ind as number) + 1;

        const newState = "help";

        // if ((sourceData.ind as number) !== newInd) {
        //   setFlashedRowId(sourceData.id as string);
        //   setTimeout(() => setFlashedRowId(null), 10);
        // }

        props.onReorderCard?.(
          props.items[sourceData.ind as number],
          sourceData.ind as number,
          newInd,
          sourceData.state as string,
          newState,
        );
      },
    });

    onCleanup(dispose);
  });

  return (
    <div
      data-drop-edge={dragging() === "dragging-over" ? (closestEdge() ?? undefined) : undefined}
      ref={ref}
      class={column({ class: props.class, folded: folded() })}
    >
      <div>
        <div class={columnHeader({ folded: folded() })}>
          <div class="flex items-center gap-2">
            <Button size="xs" variant="ghost" modifier="square" onClick={() => setFolded(!folded())}>
              <Show when={folded()} fallback={<Fold size={iconSize["sm"]} />}>
                <UnFold size={iconSize["sm"]} />
              </Show>
            </Button>
            {!folded() && (
              <div>
                {props.col.title}
                <span class="text-xs font-normal text-base-content/50 ml-2">{props.items.length}</span>
              </div>
            )}
          </div>
          <div>
            {!folded() && (
              <Button size="xs" variant="ghost" modifier="square">
                <Plus size={iconSize["sm"]} />
              </Button>
            )}
          </div>
          {folded() && (
            <div class="font-semibold text-sm [writing-mode:vertical-rl] mt-2">
              {props.col.title}
              <span class="text-xs font-normal text-base-content/50 mt-2">{props.items.length}</span>
            </div>
          )}
        </div>
      </div>
      <div class={columnContent()}>
        {!folded() && (
          <For each={props.items}>
            {(item) => (
              <KanbanCard<T>
                item={item}
                dragEnabled={itemDragEnabled}
                onCardClick={() => props.onCardClick?.(item)}
                class={props.cardClass}
                renderItem={props.renderItem}
              />
            )}
          </For>
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
