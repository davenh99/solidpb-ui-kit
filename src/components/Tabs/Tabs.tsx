import { ParentComponent } from "solid-js";
import { Tabs as KTabs } from "@kobalte/core/tabs";
import { tv } from "tailwind-variants";

export interface TabsProps {
  defaultTab?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export interface TabsComponents {
  Trigger: ParentComponent<{ value: string }>;
  Content: ParentComponent<{ value: string }>;
  List: ParentComponent<{ size?: "xs" | "sm" | "md" | "lg" | "xl" }>;
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
    <KTabs class={tabs({ size: props.size })} defaultValue={props.defaultTab}>
      {props.children}
    </KTabs>
  );
};

export const TabList: ParentComponent<{ size?: "xs" | "sm" | "md" | "lg" | "xl" }> = (props) => {
  return <KTabs.List class={tabs({ size: props.size })}>{props.children}</KTabs.List>;
};

export const TabTrigger: ParentComponent<{ value: string }> = (props) => {
  return (
    <KTabs.Trigger value={props.value} as={"a"} class={tab()}>
      {props.children}
    </KTabs.Trigger>
  );
};

export const TabContent: ParentComponent<{ value: string }> = (props) => {
  return (
    <KTabs.Content class={tabContent()} value={props.value}>
      {props.children}
    </KTabs.Content>
  );
};

Tabs.Trigger = TabTrigger;
Tabs.Content = TabContent;
Tabs.List = TabList;

export default Tabs;
