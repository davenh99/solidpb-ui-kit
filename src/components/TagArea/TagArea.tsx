import { createSignal, For, JSX, Show, createMemo } from "solid-js";
import { Input } from "../Input";
import Tag from "../Tag/Tag";

interface TagAreaProps<T extends Tag = Tag> {
  tags: T[];
  setTags: (tags: T[]) => void;
  onCreateTag: (name: string) => Promise<T | undefined>;
  onDeleteTag: (tag: T) => Promise<void>;
  suggestions?: T[];
  placeholder?: string;
}

export const TagArea = <T extends Tag = Tag>(props: TagAreaProps<T>) => {
  const [tagInput, setTagInput] = createSignal("");
  const [showSuggestions, setShowSuggestions] = createSignal(false);

  const filteredSuggestions = createMemo(() =>
    (props.suggestions || []).filter(
      (s) =>
        s.name.toLowerCase().includes(tagInput().toLowerCase()) && !props.tags.some((t) => t.id === s.id),
    ),
  );

  const handleTagInput: JSX.EventHandlerUnion<HTMLInputElement, KeyboardEvent> = async (e) => {
    if (e.key === "Enter" && tagInput().trim()) {
      e.preventDefault();
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
    <div class="rounded-md p-2 flex flex-col bg-light-surface dark:bg-dark-surface">
      <div class="flex flex-wrap gap-2">
        <For each={props.tags || []}>
          {(t) => (
            <Tag title={t.name || ""} colorHex={t.colorHex || "#6b7280"} onClick={() => deleteTag(t)} />
          )}
        </For>
        <div class="relative flex-1 min-w-30">
          <Input
            label=""
            value={tagInput()}
            onChange={(v) => {
              setTagInput(v);
              setShowSuggestions(true);
            }}
            inputProps={{
              onKeyDown: handleTagInput,
              placeholder: props.placeholder || "Add tags (press Enter)",
              onFocus: () => setShowSuggestions(true),
              onBlur: () => setTimeout(() => setShowSuggestions(false), 100),
            }}
            class="w-full"
          />
          <Show when={showSuggestions() && filteredSuggestions().length > 0}>
            <div class="absolute z-10 mt-1 w-full bg-light-surface dark:bg-dark-surface border border-light-muted dark:border-dark-muted rounded shadow-lg max-h-40 overflow-auto">
              <For each={filteredSuggestions()}>
                {(s) => (
                  <div
                    class="px-3 py-2 cursor-pointer hover:bg-light-muted dark:hover:bg-dark-muted"
                    onMouseDown={() => handleSuggestionClick(s)}
                  >
                    {s.name}
                  </div>
                )}
              </For>
            </div>
          </Show>
        </div>
      </div>
    </div>
  );
};

export default TagArea;
