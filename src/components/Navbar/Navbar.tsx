import { DropdownMenu } from "@kobalte/core/dropdown-menu";
import { ParentComponent } from "solid-js";
import { tv } from "tailwind-variants";

export interface NavbarProps {
  class?: string;
}

export interface NavbarComponents {
  Brand: ParentComponent;
  Profile: ParentComponent;
  Menu: ParentComponent;
  MenuItem: ParentComponent;
  Submenu: ParentComponent<{ title: string }>;
}

const navbar = tv({
  base: "navbar bg-base-100 shadow-sm flex justify-between sticky top-0 z-10",
});

export const Navbar: ParentComponent<NavbarProps> & NavbarComponents = (props) => {
  return <nav class={navbar({ class: props.class })}>{props.children}</nav>;
};

export const NavbarBrand: ParentComponent = (props) => {
  return <div class="btn btn-lg btn-ghost">{props.children}</div>;
};

export const NavbarProfile: ParentComponent = (props) => {
  return <div class="avatar">{props.children}</div>;
};

export const NavbarMenu: ParentComponent = (props) => {
  return <ul class="menu menu-horizontal">{props.children}</ul>;
};

export const NavbarSubmenu: ParentComponent<{ title: string }> = (props) => {
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger as="details">
        <summary>{props.title}</summary>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content>
          <ul class="menu bg-base-100 shadow-sm rounded-box mt-2 z-100">{props.children}</ul>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu>
  );
};

export const NavbarMenuItem: ParentComponent = (props) => {
  return <li>{props.children}</li>;
};

Navbar.Brand = NavbarBrand;
Navbar.Profile = NavbarProfile;
Navbar.Menu = NavbarMenu;
Navbar.MenuItem = NavbarMenuItem;
Navbar.Submenu = NavbarSubmenu;

export default Navbar;
