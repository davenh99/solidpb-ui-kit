import { DropdownMenu as KDropdownMenu } from "@kobalte/core/dropdown-menu";
import { Component, For, JSXElement } from "solid-js";
import { tv } from "tailwind-variants";

interface DropdownMenuProps {
  items: { label: string; onSelect: () => void }[];
  trigger: JSXElement;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const menu = tv({
  base: "dropdown-content menu bg-base-200 min-w-30 shadow-sm mt-2 p-2 rounded-box",
  variants: {
    size: {
      xs: "menu-xs",
      sm: "menu-sm",
      md: "menu-base",
      lg: "menu-lg",
      xl: "menu-xl",
    },
  },
});

const item = tv({
  base: "px-3 py-2 cursor-pointer rounded",
});

export const DropdownMenu: Component<DropdownMenuProps> = (props) => (
  <KDropdownMenu>
    <KDropdownMenu.Trigger>{props.trigger}</KDropdownMenu.Trigger>
    <KDropdownMenu.Portal>
      <KDropdownMenu.Content class={menu({ size: props.size })}>
        <ul>
          <For each={props.items}>
            {(itemObj) => (
              <li>
                <KDropdownMenu.Item class={item()} onSelect={itemObj.onSelect}>
                  {itemObj.label}
                </KDropdownMenu.Item>
              </li>
            )}
          </For>
        </ul>
      </KDropdownMenu.Content>
    </KDropdownMenu.Portal>
  </KDropdownMenu>
);

export default DropdownMenu;
