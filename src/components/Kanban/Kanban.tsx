import { Component, JSXElement } from "solid-js";

export interface KanbanItem {
  kanbanState: string;
  kanbanPosition?: number;
}

export interface KanbanProps<T extends KanbanItem> {
  items: T[];
  kanbanStates: string[];
  renderItem: (item: T) => JSXElement;
  onReorderItem: (
    item: T,
    beforeItem: T | null,
    afterItem: T | null,
    newInd: number,
    newState: string,
  ) => void;
}

export const Kanban = <T extends KanbanItem>(props: KanbanProps<T>) => {
  return <div>Kanban Component</div>;
};

export default Kanban;
