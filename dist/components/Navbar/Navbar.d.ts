import { ParentComponent } from "solid-js";
export interface NavbarProps {
    class?: string;
}
export interface NavbarComponents {
    Brand: ParentComponent<{
        href?: string;
    }>;
    Profile: ParentComponent;
    Menu: ParentComponent;
    MenuItem: ParentComponent;
    Submenu: ParentComponent<{
        title: string;
    }>;
}
export declare const Navbar: ParentComponent<NavbarProps> & NavbarComponents;
export declare const NavbarBrand: ParentComponent<{
    href?: string;
}>;
export declare const NavbarProfile: ParentComponent;
export declare const NavbarMenu: ParentComponent;
export declare const NavbarSubmenu: ParentComponent<{
    title: string;
}>;
export declare const NavbarMenuItem: ParentComponent;
export default Navbar;
