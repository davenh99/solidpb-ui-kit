import { ParentComponent } from "solid-js";
import { Tabs as KTabs } from "@kobalte/core/tabs";
import { tv } from "tailwind-variants";

export interface TabsProps {
  defaultTab?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  class?: string;
}

export interface TabsComponents {
  Trigger: ParentComponent<{ value: string; class?: string }>;
  Content: ParentComponent<{ value: string; class?: string }>;
  List: ParentComponent<{ size?: "xs" | "sm" | "md" | "lg" | "xl"; class?: string }>;
}

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

export const Tabs: ParentComponent<TabsProps> & TabsComponents = (props) => {
  return (
    <KTabs class={tabs({ size: props.size, class: props.class })} defaultValue={props.defaultTab}>
      {props.children}
    </KTabs>
  );
};

export const TabList: ParentComponent<{ size?: "xs" | "sm" | "md" | "lg" | "xl"; class?: string }> = (
  props,
) => {
  return <KTabs.List class={tabs({ size: props.size, class: props.class })}>{props.children}</KTabs.List>;
};

export const TabTrigger: ParentComponent<{ value: string; class?: string }> = (props) => {
  return (
    <KTabs.Trigger value={props.value} as={"a"} class={tab({ class: props.class })}>
      {props.children}
    </KTabs.Trigger>
  );
};

export const TabContent: ParentComponent<{ value: string; class?: string }> = (props) => {
  return (
    <KTabs.Content class={tabContent({ class: props.class })} value={props.value}>
      {props.children}
    </KTabs.Content>
  );
};

Tabs.Trigger = TabTrigger;
Tabs.Content = TabContent;
Tabs.List = TabList;

export default Tabs;
