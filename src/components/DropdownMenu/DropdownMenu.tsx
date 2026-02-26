import {
  DropdownMenu as KDropdownMenu,
  type DropdownMenuItemProps,
  type DropdownMenuRootProps as KDropdownMenuRootProps,
  type DropdownMenuTriggerProps,
} from "@kobalte/core/dropdown-menu";
import { ParentComponent, splitProps, ValidComponent } from "solid-js";
import { tv } from "tailwind-variants";
import { Button, type ButtonProps } from "../Button";
import { PolymorphicProps } from "@kobalte/core";

interface DropdownMenuProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  class?: string;
}

type DropdownMenuRootProps<T extends ValidComponent = "div"> = PolymorphicProps<T, KDropdownMenuRootProps> & {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  class?: string;
};

type DropDownMenuItemProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  DropdownMenuItemProps<T>
> & { onSelect: () => void };

type DropDownMenuTriggerProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  DropdownMenuTriggerProps<T>
> & { onSelect: () => void };

interface DropdownMenuComponents {
  MenuItem: ParentComponent<DropDownMenuItemProps>;
  Trigger: ParentComponent<ButtonProps>;
  Content: ParentComponent<DropdownMenuProps>;
}

const menu = tv({
  base: "dropdown-content menu bg-base-100 shadow-sm mt-2 rounded-box z-50 border border-base-200 outline-none",
  variants: {
    size: {
      xs: "menu-xs",
      sm: "menu-sm",
      md: "menu-base",
      lg: "menu-lg",
      xl: "menu-xl",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

const item = tv({
  base: "cursor-pointer rounded w-full outline-none focus:bg-base-300 rounded-sm",
});

export const DropdownMenu: ParentComponent<DropdownMenuRootProps> & DropdownMenuComponents = (props) => {
  const [local, others] = splitProps(props, ["children"]);

  return <KDropdownMenu {...others}>{local.children}</KDropdownMenu>;
};

export const DropdownMenuTrigger: ParentComponent<ButtonProps> = (props) => {
  const [local, others] = splitProps(props, ["children"]);

  return (
    <KDropdownMenu.Trigger as={Button} {...others}>
      {local.children}
    </KDropdownMenu.Trigger>
  );
};

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
    <KDropdownMenu.Item as="li" class={item()} {...props}>
      {props.children}
    </KDropdownMenu.Item>
  );
};

DropdownMenu.Trigger = DropdownMenuTrigger;
DropdownMenu.Content = DropdownMenuContent;
DropdownMenu.MenuItem = DropdownMenuItem;

export default DropdownMenu;
