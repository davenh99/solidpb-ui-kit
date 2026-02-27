import { type DropdownMenuItemProps, type DropdownMenuRootProps as KDropdownMenuRootProps } from "@kobalte/core/dropdown-menu";
import { ParentComponent, ValidComponent } from "solid-js";
import { type ButtonProps } from "../Button";
import { PolymorphicProps } from "@kobalte/core";
interface DropdownMenuProps {
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    class?: string;
}
type DropdownMenuRootProps<T extends ValidComponent = "div"> = PolymorphicProps<T, KDropdownMenuRootProps> & {
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    class?: string;
};
type DropDownMenuItemProps<T extends ValidComponent = "div"> = PolymorphicProps<T, DropdownMenuItemProps<T>> & {
    onSelect: () => void;
};
interface DropdownMenuComponents {
    MenuItem: ParentComponent<DropDownMenuItemProps>;
    Trigger: ParentComponent<ButtonProps>;
    Content: ParentComponent<DropdownMenuProps>;
}
export declare const DropdownMenu: ParentComponent<DropdownMenuRootProps> & DropdownMenuComponents;
export declare const DropdownMenuTrigger: ParentComponent<ButtonProps>;
export declare const DropdownMenuContent: ParentComponent<DropdownMenuProps>;
export declare const DropdownMenuItem: ParentComponent<{
    onSelect: () => void;
}>;
export default DropdownMenu;
