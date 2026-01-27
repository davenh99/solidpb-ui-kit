import { createSignal, For, JSX, Show, createMemo } from "solid-js";
import { TextField } from "@kobalte/core/text-field";
import Tag from "../Tag/Tag";
import { tv } from "tailwind-variants";

interface TagAreaProps<T extends Tag = Tag> {
  tags: T[];
  setTags: (tags: T[]) => void;
  onCreateTag: (name: string) => Promise<T | undefined>;
  onDeleteTag: (tag: T) => Promise<void>;
  suggestions?: T[];
  placeholder?: string;
  editable?: boolean;
}

const tagArea = tv({
  base: "textarea outline-offset-0 p-2 min-h-2",
  variants: {
    editing: {
      true: "",
      false: "cursor-pointer",
    },
  },
  defaultVariants: {
    editing: false,
  },
});

export const TagArea = <T extends Tag = Tag>(props: TagAreaProps<T>) => {
  const [tagInput, setTagInput] = createSignal("");
  const [showSuggestions, setShowSuggestions] = createSignal(false);
  const [editing, setEditing] = createSignal(false);
  let inputRef: HTMLInputElement | undefined;

  const filteredSuggestions = createMemo(() =>
    (props.suggestions || []).filter(
      (s) =>
        s.name.toLowerCase().includes(tagInput().toLowerCase()) && !props.tags.some((t) => t.id === s.id),
    ),
  );

  const handleTagInput: JSX.EventHandlerUnion<HTMLInputElement, KeyboardEvent> = async (e) => {
    if (tagInput().trim()) {
      setShowSuggestions(true);

      if (e.key === "Enter") {
        e.preventDefault();
        e.stopPropagation();
        const newTagName = tagInput().trim();
        if (!props.tags.map((t) => t.name).includes(newTagName)) {
          let newTag: T | undefined = undefined;
          newTag = await props.onCreateTag(newTagName);
          if (newTag) props.setTags([...props.tags, newTag]);
        }
        setTagInput("");
        setShowSuggestions(false);
      } else {
        setShowSuggestions(true);
      }
    } else {
      setShowSuggestions(false);

      if (e.key === "Delete" || e.key === "Backspace") {
        if (props.tags.length > 0) {
          const lastTag = props.tags[props.tags.length - 1];
          await props.onDeleteTag(lastTag);
          props.setTags(props.tags.slice(0, -1));
        }
      }
    }
  };

  const handleSuggestionClick = (tag: T) => {
    props.setTags([...props.tags, tag]);
    setTagInput("");
    setShowSuggestions(false);
  };

  const deleteTag = async (t: T) => {
    await props.onDeleteTag(t);
    props.setTags((props.tags || []).filter((tag) => tag.id !== t.id));
  };

  return (
    <div
      class={tagArea({ editing: editing() }).toString()}
      onMouseDown={(e) => {
        if (props.editable === false) return;
        e.preventDefault();
        setEditing(true);
        inputRef?.focus();
      }}
    >
      <div class="flex flex-wrap gap-1">
        <For each={props.tags || []}>
          {(t) => (
            <Tag
              title={t.name || ""}
              colorHex={t.colorHex || "#6b7280"}
              onDelete={
                editing()
                  ? () => {
                      setShowSuggestions(false);
                      deleteTag(t);
                    }
                  : undefined
              }
            />
          )}
        </For>
        {editing() && props.editable !== false && (
          <div class="relative flex-1 min-w-30">
            <TextField value={tagInput()} onChange={setTagInput}>
              <TextField.Input
                ref={inputRef}
                onKeyDown={handleTagInput}
                placeholder={props.placeholder || ""}
                onBlur={() => {
                  setEditing(false);
                  setShowSuggestions(false);
                  setTagInput("");
                }}
                class="w-full focus:outline-none"
              />
            </TextField>
            <Show when={showSuggestions() && filteredSuggestions().length > 0}>
              <div class="dropdown-content bg-base-200 min-w-30 shadow-sm rounded-box menu p-0 absolute">
                <ul>
                  <For each={filteredSuggestions()}>
                    {(s) => (
                      <li
                        class="px-3 py-2 cursor-pointer rounded"
                        onMouseDown={() => handleSuggestionClick(s)}
                      >
                        {s.name}
                      </li>
                    )}
                  </For>
                </ul>
              </div>
            </Show>
          </div>
        )}
      </div>
    </div>
  );
};

export default TagArea;
