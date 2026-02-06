import { DropdownMenu as KDropdownMenu } from "@kobalte/core/dropdown-menu";
import { ParentComponent } from "solid-js";
import { tv } from "tailwind-variants";

interface DropdownMenuProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  class?: string;
}

interface DropdownMenuComponents {
  MenuItem: ParentComponent<{ onSelect: () => void }>;
  Trigger: ParentComponent;
  Content: ParentComponent<DropdownMenuProps>;
}

const menu = tv({
  base: "dropdown-content menu bg-base-100 shadow-sm mt-2 rounded-box z-50",
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
  base: "cursor-pointer rounded w-full",
});

export const DropdownMenu: ParentComponent & DropdownMenuComponents = (props) => (
  <KDropdownMenu>{props.children}</KDropdownMenu>
);

export const DropdownMenuTrigger: ParentComponent = (props) => (
  <KDropdownMenu.Trigger>{props.children}</KDropdownMenu.Trigger>
);

export const DropdownMenuContent: ParentComponent<DropdownMenuProps> = (props) => {
  return (
    <KDropdownMenu.Portal>
      <KDropdownMenu.Content as="ul" class={menu({ size: props.size, class: props.class })}>
        {props.children}
      </KDropdownMenu.Content>
    </KDropdownMenu.Portal>
  );
};

export const DropdownMenuItem: ParentComponent<{ onSelect: () => void }> = (props) => {
  return (
    <KDropdownMenu.Item as="li" class={item()} onSelect={props.onSelect}>
      {props.children}
    </KDropdownMenu.Item>
  );
};

DropdownMenu.Trigger = DropdownMenuTrigger;
DropdownMenu.Content = DropdownMenuContent;
DropdownMenu.MenuItem = DropdownMenuItem;

export default DropdownMenu;
