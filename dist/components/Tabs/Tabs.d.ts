import { ParentComponent } from "solid-js";
export interface TabsProps {
    defaultTab?: string;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
}
export interface TabsComponents {
    Trigger: ParentComponent<{
        value: string;
    }>;
    Content: ParentComponent<{
        value: string;
    }>;
    List: ParentComponent<{
        size?: "xs" | "sm" | "md" | "lg" | "xl";
    }>;
}
export declare const Tabs: ParentComponent<TabsProps> & TabsComponents;
export declare const TabList: ParentComponent<{
    size?: "xs" | "sm" | "md" | "lg" | "xl";
}>;
export declare const TabTrigger: ParentComponent<{
    value: string;
}>;
export declare const TabContent: ParentComponent<{
    value: string;
}>;
export default Tabs;
