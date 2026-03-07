import { DropdownMenu } from "@kobalte/core/dropdown-menu";
import { tv } from "tailwind-variants";
const navbar = tv({
    base: "navbar bg-base-100 shadow-sm flex justify-between sticky top-0 z-10",
});
export const Navbar = (props) => {
    return <nav class={navbar({ class: props.class })}>{props.children}</nav>;
};
export const NavbarBrand = (props) => {
    return (<a class="btn btn-lg btn-ghost" href={props.href}>
      {props.children}
    </a>);
};
export const NavbarProfile = (props) => {
    return <div class="avatar">{props.children}</div>;
};
export const NavbarMenu = (props) => {
    return <ul class="menu menu-horizontal">{props.children}</ul>;
};
export const NavbarSubmenu = (props) => {
    return (<DropdownMenu>
      <DropdownMenu.Trigger as="details">
        <summary>{props.title}</summary>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content class="z-50">
          <ul class="menu bg-base-100 shadow-sm rounded-box mt-2 border border-base-200">{props.children}</ul>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu>);
};
export const NavbarMenuItem = (props) => {
    return <li>{props.children}</li>;
};
Navbar.Brand = NavbarBrand;
Navbar.Profile = NavbarProfile;
Navbar.Menu = NavbarMenu;
Navbar.MenuItem = NavbarMenuItem;
Navbar.Submenu = NavbarSubmenu;
export default Navbar;
