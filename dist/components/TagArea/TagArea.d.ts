import { JSX } from "solid-js";
interface TagAreaProps<T extends TagRecord = TagRecord> {
    tags: T[];
    setTags: (tags: T[]) => void;
    onCreateTag: (name: string) => Promise<T>;
    onDeleteTag: (tag: T) => Promise<void>;
    suggestions?: T[];
    placeholder?: string;
}
export declare const TagArea: <T extends TagRecord = TagRecord>(props: TagAreaProps<T>) => JSX.Element;
export default TagArea;
