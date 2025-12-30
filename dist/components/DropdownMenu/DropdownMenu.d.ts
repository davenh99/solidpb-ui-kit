import { Component } from "solid-js";
interface DropdownMenuProps {
    label?: string;
    items: {
        label: string;
        onSelect: () => void;
    }[];
    class?: string;
}
export declare const DropdownMenu: Component<DropdownMenuProps>;
export default DropdownMenu;
