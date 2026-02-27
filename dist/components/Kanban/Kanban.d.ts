import { JSXElement } from "solid-js";
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
    itemStateKey?: keyof T;
    itemPositionKey?: keyof T;
    statePositionKey?: keyof K;
}
export declare const Kanban: <T extends KanbanItem, K extends KanbanState>(props: KanbanProps<T, K>) => import("solid-js").JSX.Element;
export default Kanban;
