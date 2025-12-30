interface RelationPickerProps<T extends TagRecord = TagRecord> {
    relations: T[];
    setRelations: (relations: T[]) => void;
    suggestions?: T[];
    onCreateRelation: (name: string) => Promise<T>;
    onDeleteRelation: (relation: T) => Promise<void>;
    placeholder?: string;
    label?: string;
}
export declare const RelationPicker: <T extends TagRecord = TagRecord>(props: RelationPickerProps<T>) => import("solid-js").JSX.Element;
export default RelationPicker;
