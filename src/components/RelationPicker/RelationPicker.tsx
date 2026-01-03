import { Show } from "solid-js";
import TagArea from "../TagArea/TagArea";

interface RelationPickerProps<T extends Tag = Tag> {
  relations: T[];
  setRelations: (relations: T[]) => void;
  suggestions?: T[];
  onCreateRelation: (name: string) => Promise<T>;
  onDeleteRelation: (relation: T) => Promise<void>;
  placeholder?: string;
  label?: string;
}

export const RelationPicker = <T extends Tag = Tag>(props: RelationPickerProps<T>) => {
  return (
    <div class="flex flex-col gap-1">
      <Show when={props.label}>
        <span class="text-xs font-medium text-(--color-text-light-secondary) dark:text-(--color-text-dark-secondary) mb-1">
          {props.label}
        </span>
      </Show>
      <TagArea
        tags={props.relations}
        setTags={props.setRelations}
        suggestions={props.suggestions}
        onCreateTag={props.onCreateRelation}
        onDeleteTag={props.onDeleteRelation}
        placeholder={props.placeholder || "Add relation..."}
      />
    </div>
  );
};

export default RelationPicker;
