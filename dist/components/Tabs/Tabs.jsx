import { Tabs as KTabs } from "@kobalte/core/tabs";
import { tv } from "tailwind-variants";
const tabs = tv({
    base: "tabs tabs-box",
    variants: {
        size: {
            xs: "tabs-xs",
            sm: "tabs-sm",
            md: "tabs-base",
            lg: "tabs-lg",
            xl: "tabs-xl",
        },
    },
    defaultVariants: {
        size: "sm",
    },
});
const tab = tv({
    base: "tab tab-lifted",
});
const tabContent = tv({
    base: "card bg-base-100 border-base-300 p-3 w-full",
});
export const Tabs = (props) => {
    return (<KTabs class={tabs({ size: props.size, class: props.class })} defaultValue={props.defaultTab}>
      {props.children}
    </KTabs>);
};
export const TabList = (props) => {
    return <KTabs.List class={tabs({ size: props.size, class: props.class })}>{props.children}</KTabs.List>;
};
export const TabTrigger = (props) => {
    return (<KTabs.Trigger value={props.value} as={"a"} class={tab({ class: props.class })}>
      {props.children}
    </KTabs.Trigger>);
};
export const TabContent = (props) => {
    return (<KTabs.Content class={tabContent({ class: props.class })} value={props.value}>
      {props.children}
    </KTabs.Content>);
};
Tabs.Trigger = TabTrigger;
Tabs.Content = TabContent;
Tabs.List = TabList;
export default Tabs;
