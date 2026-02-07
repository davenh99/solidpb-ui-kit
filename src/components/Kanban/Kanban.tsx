import { createEffect, createMemo, For, JSXElement, onCleanup } from "solid-js";
import { extractClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { tv } from "tailwind-variants";

import { triggerFlash } from "../../methods/triggerFlash";
import { KanbanColumn } from "./KanbanColumn";

const container = tv({
  base: "flex gap-2 overflow-x-auto",
});

export interface KanbanProps<T extends KanbanItem, K extends KanbanState> {
  columns: K[];
  items: T[];
  renderItem?: (item: T) => JSXElement;
  onCardClick?: (item: T) => void;
  containerClass?: string;
  columnClass?: string;
  cardClass?: string;
  onCreateItem?: (item: T) => void;
  onCollapseColumn?: (collapsed: boolean) => void;
  onReorderCard?: (item: T, oldPos: number, newPos: number, oldState: string, newState: string) => void;
  onReorderColumn?: (col: K, oldPos: number, newPos: number) => void;
}

export const Kanban = <T extends KanbanItem, K extends KanbanState>(props: KanbanProps<T, K>) => {
  const getItemsByState = (state: string) => {
    return props.items.filter((item) => item.kanbanState === state);
  };
  const colDragEnabled = createMemo(() => {
    const data = props.columns;
    return !!data && data.length > 0 && "statePosition" in data[0];
  });

  createEffect(() => {
    if (!props.items.length || !colDragEnabled()) return;

    const dispose = monitorForElements({
      canMonitor({ source }) {
        return source.data.collectionId == props.items[0].collectionId && !!source.data.isKanbanColumn;
      },
      onDrop({ location, source }) {
        const target = location.current.dropTargets[0];
        if (!target) {
          return;
        }

        const sourceData = source.data;
        const targetData = target.data;

        if (sourceData.collectionId !== targetData.collectionId || !source.data.isKanbanColumn) {
          return;
        }

        if ((sourceData.ind as number) < 0 || (targetData.ind as number) < 0) {
          return;
        }

        const closestEdgeOfTarget = extractClosestEdge(targetData);

        const newInd =
          closestEdgeOfTarget === "top" ? (targetData.ind as number) : (targetData.ind as number) + 1;

        // if ((sourceData.ind as number) !== newInd) {
        //   setFlashedRowId(sourceData.id as string);
        //   setTimeout(() => setFlashedRowId(null), 10);
        // }

        props.onReorderColumn?.(props.columns[sourceData.ind as number], sourceData.ind as number, newInd);
      },
    });

    onCleanup(dispose);
  });

  return (
    <div class={container({ class: props.containerClass })}>
      <For each={props.columns}>
        {(col) => (
          <KanbanColumn<T, K>
            col={col}
            dragEnabled={colDragEnabled}
            cardClass={props.cardClass}
            items={getItemsByState(col.id)}
            class={props.columnClass}
            onCardClick={props.onCardClick}
            renderItem={props.renderItem}
            onCreateItem={props.onCreateItem}
            onReorderCard={props.onReorderCard}
            onCollapse={props.onCollapseColumn}
          />
        )}
      </For>
    </div>
  );
};

export default Kanban;
