import { JSXElement } from "solid-js";
import { ColumnDef, Row } from "@tanstack/solid-table";
interface TableProps<T> {
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
    showHeaders?: boolean;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    canReorder?: boolean;
    tableDataKey?: string | symbol;
    onReorderRow?: (item: T, oldInd: number, newInd: number) => void;
}
export declare const Table: <T extends object>(props: TableProps<T>) => JSXElement;
export default Table;
