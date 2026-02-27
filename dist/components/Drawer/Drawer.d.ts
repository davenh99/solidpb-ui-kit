import { JSXElement, Component, ParentComponent } from "solid-js";
export interface DrawerProps {
    children?: JSXElement;
    class?: string;
    id: string;
}
export interface DrawerMenuItemProps {
    icon: JSXElement;
    label: string;
    href?: string;
}
export interface DrawerComponents {
    Trigger: ParentComponent<{
        class?: string;
    }>;
    Content: ParentComponent;
    Drawer: ParentComponent<{
        class?: string;
    }>;
    Menu: ParentComponent;
    MenuItem: ParentComponent<DrawerMenuItemProps>;
}
export declare const Drawer: Component<DrawerProps> & DrawerComponents;
export declare const DrawerTrigger: ParentComponent<{
    class?: string;
}>;
export declare const DrawerContent: ParentComponent;
export declare const DrawerDrawer: ParentComponent<{
    class?: string;
}>;
export declare const DrawerMenu: ParentComponent;
export declare const DrawerMenuItem: Component<DrawerMenuItemProps>;
export default Drawer;
