import { JSX } from "solid-js";
interface TagAreaProps<T extends Tag = Tag> {
    tags: T[];
    setTags: (tags: T[]) => void;
    onCreateTag: (name: string) => Promise<T>;
    onDeleteTag: (tag: T) => Promise<void>;
    suggestions?: T[];
    placeholder?: string;
}
export declare const TagArea: <T extends Tag = Tag>(props: TagAreaProps<T>) => JSX.Element;
export default TagArea;
