import { JSXElement, Component, ParentComponent } from "solid-js";
import { DrawerContext, useDrawer } from "./drawerContext";
import { tv } from "tailwind-variants";

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
  Trigger: ParentComponent<{ class?: string }>;
  Content: ParentComponent;
  Drawer: ParentComponent<{ class?: string }>;
  Menu: ParentComponent;
  MenuItem: ParentComponent<DrawerMenuItemProps>;
}

export const Drawer: Component<DrawerProps> & DrawerComponents = (props) => {
  return (
    <DrawerContext.Provider value={{ id: props.id }}>
      <div class="drawer lg:drawer-open">
        <input id={props.id} type="checkbox" class="drawer-toggle" />
        {props.children}
      </div>
    </DrawerContext.Provider>
  );
};

const trigger = tv({
  base: "",
});

export const DrawerTrigger: ParentComponent<{ class?: string }> = (props) => {
  const { id } = useDrawer();

  return (
    <label for={id} aria-label="open sidebar" class={trigger({ class: props.class })}>
      {props.children}
    </label>
  );
};

export const DrawerContent: ParentComponent = (props) => {
  return <div class="drawer-content">{props.children}</div>;
};

const drawer = tv({
  base: "flex bg-base-200 min-h-full flex-col is-drawer-close:w-16 is-drawer-open:w-50",
});

export const DrawerDrawer: ParentComponent<{ class?: string }> = (props) => {
  const { id } = useDrawer();

  return (
    <div class="drawer-side is-drawer-close:overflow-visible">
      <label class="drawer-overlay" aria-label="close sidebar" for={id} />
      <div class={drawer({ class: props.class })}>{props.children}</div>
    </div>
  );
};

export const DrawerMenu: ParentComponent = (props) => {
  return <ul class="menu w-full grow">{props.children}</ul>;
};

export const DrawerMenuItem: Component<DrawerMenuItemProps> = (props) => {
  return (
    <li>
      <a
        href={props.href}
        class="is-drawer-close:tooltip is-drawer-close:tooltip-right"
        data-tip={props.label}
      >
        {props.icon}
        <span class="is-drawer-close:hidden text-nowrap">{props.label}</span>
      </a>
    </li>
  );
};

Drawer.Trigger = DrawerTrigger;
Drawer.Content = DrawerContent;
Drawer.Drawer = DrawerDrawer;
Drawer.Menu = DrawerMenu;
Drawer.MenuItem = DrawerMenuItem;

export default Drawer;
