import { For, JSXElement, ParentComponent } from "solid-js";
import { Tabs as KTabs } from "@kobalte/core/tabs";
import { tv } from "tailwind-variants";

export interface Tab {
  // unique identifier for the tab
  value: string;
  trigger: JSXElement;
  content: JSXElement;
}

export interface TabsProps {
  defaultTab?: string;
  tabs: Tab[];
  size?: "xs" | "sm" | "md" | "lg" | "xl";
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
});

const tab = tv({
  base: "tab tab-lifted",
});

const tabContent = tv({
  base: "card bg-base-100 border-base-300 p-3 w-full",
});

export const Tabs: ParentComponent<TabsProps> = (props) => {
  return (
    <KTabs class={tabs({ size: props.size })} defaultValue={props.defaultTab}>
      <KTabs.List class={tabs({ size: props.size })}>
        <For each={props.tabs}>
          {(content) => (
            <KTabs.Trigger as={"a"} class={tab()} value={content.value}>
              {content.trigger}
            </KTabs.Trigger>
          )}
        </For>
      </KTabs.List>
      <For each={props.tabs}>
        {(content) => (
          <KTabs.Content class={tabContent()} value={content.value}>
            {content.content}
          </KTabs.Content>
        )}
      </For>
    </KTabs>
  );
};

export default Tabs;
