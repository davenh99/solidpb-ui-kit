import { JSXElement } from "solid-js";
import { ColumnDef, Row } from "@tanstack/solid-table";
interface TableItem {
    id: string;
    collectionId: string;
    tablePosition?: number;
}
interface TableProps<T extends TableItem> {
    data: T[];
    createFunc?: () => Promise<void>;
    headerActions?: JSXElement;
    columns: ColumnDef<T>[];
    onRowClick?: (item: T) => void;
    loading?: boolean;
    emptyState?: JSXElement;
    loadingFallback?: JSXElement;
    searchPlaceholder?: string;
    renderRow?: (row: Row<T>, onRowClick: (item: T) => void) => JSXElement;
    showItemCount?: boolean;
    class?: string;
    search?: boolean;
    headers?: boolean;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    onReorderRow?: (item: T, oldInd: number, newInd: number) => void;
}
export declare const Table: <T extends TableItem>(props: TableProps<T>) => JSXElement;
export default Table;
