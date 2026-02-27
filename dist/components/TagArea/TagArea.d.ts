import { JSX, JSXElement } from "solid-js";
interface TagAreaProps<T extends Tag = Tag> {
    tags: T[];
    setTags: (tags: T[]) => void;
    onCreateTag: (name: string) => Promise<T | undefined>;
    onDeleteTag: (tag: T) => Promise<void>;
    suggestions?: T[];
    noSuggestionsPlaceholder?: string;
    dropDownAction?: JSXElement;
    placeholder?: string;
    editable?: boolean;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
}
export declare const TagArea: <T extends Tag = Tag>(props: TagAreaProps<T>) => JSX.Element;
export default TagArea;
