import { Accessor, JSXElement } from "solid-js";
export interface KanbanColumnProps<T extends KanbanItem, K extends KanbanState> {
    col?: K;
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
    itemStateKey?: keyof T;
    itemPositionKey?: keyof T;
}
export declare const KanbanColumn: <T extends KanbanItem, K extends KanbanState>(props: KanbanColumnProps<T, K>) => import("solid-js").JSX.Element;
export default KanbanColumn;
