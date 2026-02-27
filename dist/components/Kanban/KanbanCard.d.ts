import { Accessor, JSXElement } from "solid-js";
export interface KanbanCardProps<T extends KanbanItem> {
    item: T;
    dragEnabled: Accessor<boolean>;
    flashSignal: Accessor<string | null>;
    onCardClick?: () => void;
    renderItem?: (item: T) => JSXElement;
    class?: string;
}
export declare const KanbanCard: <T extends KanbanItem>(props: KanbanCardProps<T>) => import("solid-js").JSX.Element;
export default KanbanCard;
