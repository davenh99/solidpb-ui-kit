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
import { Input } from "../Input";

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
  onCreateItem?: (title: string, state: string) => void;
  onReorderCard?: (item: T, oldPos: number, newPos: number, oldState: string, newState: string) => void;
  onCollapse?: (collapsed: boolean) => void;
  flashSignal: Accessor<string | null>;
}

export const KanbanColumn = <T extends KanbanItem, K extends KanbanState>(props: KanbanColumnProps<T, K>) => {
  let ref!: HTMLDivElement;
  const [dragging, setDragging] = createSignal<DraggingState>("idle");
  const [closestEdge, setClosestEdge] = createSignal<Edge | null>();
  const [cardDraggedOver, setCardDraggedOver] = createSignal(false);
  const [folded, setFolded] = createSignal(false);
  const [creatingItem, setCreatingItem] = createSignal(false);
  const [newItemTitle, setNewItemTitle] = createSignal("");
  const filteredItems = createMemo(() => {
    return props.items
      .filter((item) => item.kanbanState === props.col.id)
      .sort((a, b) => (a.kanbanPosition || 0) - (b.kanbanPosition || 0));
  });
  const itemDragEnabled = createMemo(() => {
    const data = filteredItems();
    return !!data && data.length > 0 && "kanbanPosition" in data[0];
  });
  const [flashedCardId, setFlashedCardId] = createSignal<string | null>(null);

  createEffect(() => {
    if (props.flashSignal?.() === props.col.id && ref) {
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
        // only allowing same collection for now to be dropped on me
        return (source.data.item as K).collectionId == props.col.collectionId;
      },
      getIsSticky() {
        return true;
      },
      getData({ input }) {
        return attachClosestEdge(
          {
            item: props.col,
            isKanbanColumn: true,
          },
          { element, input, allowedEdges: ["left", "right"] },
        );
      },
      onDragEnter({ self, source }) {
        setDragging("dragging-over");

        if (source.data.isKanbanColumn) {
          const _closestEdge = extractClosestEdge(self.data);
          setClosestEdge(_closestEdge);
        } else if (source.data.isKanbanCard) {
          setCardDraggedOver(true);
        }
      },
      onDrag({ self, source }) {
        if (source.data.isKanbanColumn) {
          const _closestEdge = extractClosestEdge(self.data);
          // Only need to update state if nothing has changed.
          if (dragging() !== "dragging-over" || _closestEdge !== closestEdge()) {
            setDragging("dragging-over");
            setClosestEdge(_closestEdge);
          }
        } else if (source.data.isKanbanCard) {
          setCardDraggedOver(true);
        }
      },
      onDragLeave() {
        setDragging("idle");
        setCardDraggedOver(false);
      },
      onDrop() {
        setDragging("idle");
        setCardDraggedOver(false);
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
          item: props.col,
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
    if (!filteredItems().length || !itemDragEnabled()) return;

    const dispose = monitorForElements({
      canMonitor({ source }) {
        if (!source.data.item) {
          return false;
        }
        return (
          (source.data.item as T).collectionId == filteredItems()[0].collectionId &&
          !!source.data.isKanbanCard
        );
      },
      onDrop({ location, source }) {
        const target = location.current.dropTargets[0];
        if (!target) {
          return;
        }

        const sourceData = source.data;
        const targetData = target.data;
        const sourceItem = sourceData.item as T;
        const targetItem = targetData.item as T;

        if (sourceItem.collectionId !== targetItem.collectionId) {
          return;
        }

        if (target.data.isKanbanColumn) {
          let newInd = 0;
          for (const item of props.items.filter((item) => item.kanbanState === (target.data.item as K).id)) {
            if ((item.kanbanPosition || 0) >= newInd) {
              newInd = (item.kanbanPosition || 0) + 1;
            }
          }

          if ((sourceItem.kanbanPosition || 0) !== newInd) {
            setFlashedCardId(sourceItem.id as string);
            setTimeout(() => setFlashedCardId(null), 10);
          }

          // if we drop on the column
          props.onReorderCard?.(
            sourceItem,
            sourceItem.kanbanPosition!,
            newInd,
            sourceItem.kanbanState!,
            (targetData.item as K).id,
          );
        } else {
          const closestEdgeOfTarget = extractClosestEdge(targetData);

          const newInd =
            closestEdgeOfTarget === "top" ? targetItem.kanbanPosition! : targetItem.kanbanPosition! + 1;

          if ((sourceItem.kanbanPosition || 0) !== newInd) {
            setFlashedCardId(sourceItem.id as string);
            setTimeout(() => setFlashedCardId(null), 10);
          }

          props.onReorderCard?.(
            sourceItem,
            sourceItem.kanbanPosition!,
            newInd,
            sourceItem.kanbanState!,
            targetItem.kanbanState!,
          );
        }
      },
    });

    onCleanup(dispose);
  });

  const bgStyle = createMemo(() => {
    if (cardDraggedOver()) {
      return { "background-color": "color-mix(in srgb, var(--color-primary) 10%, transparent)" };
    }
    return {};
  });

  return (
    <div
      data-drop-edge={
        dragging() === "dragging-over" && !cardDraggedOver() ? (closestEdge() ?? undefined) : undefined
      }
      ref={ref}
      class={column({ class: props.class, folded: folded() })}
      style={{ opacity: dragging() == "dragging" ? 0.2 : 1, ...bgStyle() }}
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
                <span class="text-xs font-normal text-base-content/50 ml-2">{filteredItems().length}</span>
              </div>
            )}
          </div>
          <div>
            {!folded() && (
              <Button
                size="xs"
                variant="ghost"
                modifier="square"
                aria-label="create new item"
                onClick={() => setCreatingItem(!creatingItem())}
              >
                <Plus size={iconSize["sm"]} />
              </Button>
            )}
          </div>
          {folded() && (
            <div class="font-semibold text-sm [writing-mode:vertical-rl] mt-2">
              {props.col.title}
              <span class="text-xs font-normal text-base-content/50 mt-2">{filteredItems().length}</span>
            </div>
          )}
        </div>
      </div>
      <div class={columnContent()}>
        {!folded() && (
          <>
            {creatingItem() && (
              <div class="card bg-base-100 p-2 rounded-md space-y-1.5">
                <p class="font-medium text-sm">New Item</p>
                <Input value={newItemTitle()} onChange={setNewItemTitle} label="Title" />
                <div class="flex justify-end space-x-1.5">
                  <Button
                    appearance="neutral"
                    size="sm"
                    onClick={() => {
                      setCreatingItem(false);
                      setNewItemTitle("");
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    appearance="success"
                    size="sm"
                    onClick={() => {
                      setCreatingItem(false);
                      props.onCreateItem?.(newItemTitle(), props.col.id);
                      setNewItemTitle("");
                    }}
                  >
                    Add
                  </Button>
                </div>
              </div>
            )}
            <For each={filteredItems()}>
              {(item) => (
                <KanbanCard<T>
                  item={item}
                  dragEnabled={itemDragEnabled}
                  onCardClick={() => props.onCardClick?.(item)}
                  class={props.cardClass}
                  renderItem={props.renderItem}
                  flashSignal={() => flashedCardId()}
                />
              )}
            </For>
          </>
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
