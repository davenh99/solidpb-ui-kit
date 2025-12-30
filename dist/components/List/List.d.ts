import { ColumnDef, ColumnFiltersState, Row } from "@tanstack/solid-table";
import { Accessor, JSXElement } from "solid-js";
interface ListProps<T> {
    data?: Accessor<T[]>;
    filters?: Accessor<ColumnFiltersState>;
    createFunc?: () => Promise<void>;
    headerActions?: JSXElement;
    columns: Accessor<ColumnDef<T>[]>;
    onRowClick: (item: T) => void;
    loading?: boolean;
    emptyState?: JSXElement;
    loadingFallback?: JSXElement;
    searchPlaceholder?: string;
    renderRow?: (row: Row<T>, onRowClick: (item: T) => void) => JSXElement;
    showItemCount?: boolean;
    containerClass?: string;
    search?: boolean;
    headers?: boolean;
}
export declare const DefaultRowRenderer: <T>(props: {
    row: Row<T>;
    columns: Accessor<ColumnDef<T>[]>;
    onClick: (item: T) => void;
}) => JSXElement;
export declare const List: <T>(props: ListProps<T>) => JSXElement;
export default List;
