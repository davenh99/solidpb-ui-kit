import { createEffect, createMemo, createSignal, For, JSXElement, onCleanup } from "solid-js";
import { extractClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { tv } from "tailwind-variants";

import { KanbanColumn } from "./KanbanColumn";

const container = tv({
  base: "flex gap-2 overflow-x-auto p-2",
});

export interface KanbanProps<T extends KanbanItem, K extends KanbanState> {
  columns: K[];
  items: T[];
  renderItem?: (item: T) => JSXElement;
  onCardClick?: (item: T) => void;
  containerClass?: string;
  columnClass?: string;
  cardClass?: string;
  onCreateItem?: (title: string, state: string) => void;
  onCollapseColumn?: (collapsed: boolean) => void;
  onReorderCard?: (item: T, oldPos: number, newPos: number, oldState: string, newState: string) => void;
  onReorderColumn?: (col: K, oldPos: number, newPos: number) => void;
}

export const Kanban = <T extends KanbanItem, K extends KanbanState>(props: KanbanProps<T, K>) => {
  const sortedColumns = createMemo(() => {
    return props.columns.toSorted((a, b) => (a.statePosition ?? 0) - (b.statePosition ?? 0));
  });
  const colDragEnabled = createMemo(() => {
    const data = props.columns;
    return !!data && data.length > 0 && "statePosition" in data[0];
  });
  const [flashedColId, setFlashedColId] = createSignal<string | null>(null);

  createEffect(() => {
    if (!props.items.length || !colDragEnabled()) return;

    const dispose = monitorForElements({
      canMonitor({ source }) {
        return (
          (source.data.item as K | T).collectionId == props.items[0].collectionId &&
          !!source.data.isKanbanColumn
        );
      },
      onDrop({ location, source }) {
        const target = location.current.dropTargets[0];
        if (!target) {
          return;
        }

        const sourceData = source.data;
        const targetData = target.data;
        const sourceItem = sourceData.item as K;
        const targetItem = targetData.item as K;

        if (sourceItem.collectionId !== targetItem.collectionId && source.data.isKanbanColumn) {
          return;
        }

        if ((sourceItem.statePosition || 0) < 0 || (targetItem.statePosition || 0) < 0) {
          return;
        }

        const closestEdgeOfTarget = extractClosestEdge(targetData);

        let newInd =
          closestEdgeOfTarget === "left"
            ? targetItem.statePosition || 0
            : (targetItem.statePosition || 0) + 1;

        if (newInd > (sourceItem.statePosition || 0)) {
          newInd--;
        }

        if ((sourceItem.statePosition || 0) !== newInd) {
          setFlashedColId(sourceItem.id);
          setTimeout(() => setFlashedColId(null), 10);
        }

        props.onReorderColumn?.(sourceItem, sourceItem.statePosition || 0, newInd);
      },
    });

    onCleanup(dispose);
  });

  return (
    <div class={container({ class: props.containerClass })}>
      <For each={sortedColumns()}>
        {(col) => (
          <KanbanColumn<T, K>
            col={col}
            dragEnabled={colDragEnabled}
            cardClass={props.cardClass}
            items={props.items}
            class={props.columnClass}
            onCardClick={props.onCardClick}
            renderItem={props.renderItem}
            onCreateItem={props.onCreateItem}
            onReorderCard={props.onReorderCard}
            onCollapse={props.onCollapseColumn}
            flashSignal={() => flashedColId()}
          />
        )}
      </For>
    </div>
  );
};

export default Kanban;
