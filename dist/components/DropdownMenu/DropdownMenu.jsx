import { DropdownMenu as KDropdownMenu, } from "@kobalte/core/dropdown-menu";
import { splitProps } from "solid-js";
import { tv } from "tailwind-variants";
import { Button } from "../Button";
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
export const DropdownMenu = (props) => {
    const [local, others] = splitProps(props, ["children"]);
    return <KDropdownMenu {...others}>{local.children}</KDropdownMenu>;
};
export const DropdownMenuTrigger = (props) => {
    const [local, others] = splitProps(props, ["children"]);
    return (<KDropdownMenu.Trigger as={Button} {...others}>
      {local.children}
    </KDropdownMenu.Trigger>);
};
export const DropdownMenuContent = (props) => {
    return (<KDropdownMenu.Portal>
      <KDropdownMenu.Content as="ul" class={menu({ size: props.size, class: props.class })}>
        {props.children}
      </KDropdownMenu.Content>
    </KDropdownMenu.Portal>);
};
export const DropdownMenuItem = (props) => {
    return (<KDropdownMenu.Item as="li" class={item()} {...props}>
      {props.children}
    </KDropdownMenu.Item>);
};
DropdownMenu.Trigger = DropdownMenuTrigger;
DropdownMenu.Content = DropdownMenuContent;
DropdownMenu.MenuItem = DropdownMenuItem;
export default DropdownMenu;
