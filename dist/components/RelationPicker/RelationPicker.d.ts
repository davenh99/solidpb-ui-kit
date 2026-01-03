interface RelationPickerProps<T extends Tag = Tag> {
    relations: T[];
    setRelations: (relations: T[]) => void;
    suggestions?: T[];
    onCreateRelation: (name: string) => Promise<T>;
    onDeleteRelation: (relation: T) => Promise<void>;
    placeholder?: string;
    label?: string;
}
export declare const RelationPicker: <T extends Tag = Tag>(props: RelationPickerProps<T>) => import("solid-js").JSX.Element;
export default RelationPicker;
