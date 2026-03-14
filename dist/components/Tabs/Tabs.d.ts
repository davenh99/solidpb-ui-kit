import { ParentComponent } from "solid-js";
export interface TabsProps {
    defaultTab?: string;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    class?: string;
}
export interface TabsComponents {
    Trigger: ParentComponent<{
        value: string;
        class?: string;
    }>;
    Content: ParentComponent<{
        value: string;
        class?: string;
    }>;
    List: ParentComponent<{
        size?: "xs" | "sm" | "md" | "lg" | "xl";
        class?: string;
    }>;
}
export declare const Tabs: ParentComponent<TabsProps> & TabsComponents;
export declare const TabList: ParentComponent<{
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    class?: string;
}>;
export declare const TabTrigger: ParentComponent<{
    value: string;
    class?: string;
}>;
export declare const TabContent: ParentComponent<{
    value: string;
    class?: string;
}>;
export default Tabs;
