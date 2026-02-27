import { Accessor, Component } from "solid-js";
interface PaginationProps {
    perPage: Accessor<number>;
    perPageOptions: number[];
    page: Accessor<number>;
    totalItems: number;
    onNextPage: () => void;
    onPrevPage: () => void;
    onPageChange: (page: number) => void;
    onPerPageChange: (perPage: number) => void;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    class?: string;
}
export declare const Pagination: Component<PaginationProps>;
export {};
