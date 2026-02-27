import { Component } from "solid-js";
export interface BreadCrumb {
    label: string;
    href?: string;
    onClick?: () => void;
}
export interface BreadCrumbsProps {
    items: BreadCrumb[];
    class?: string;
}
export declare const BreadCrumbs: Component<BreadCrumbsProps>;
export default BreadCrumbs;
