import { createSignal, For, Show, createMemo } from "solid-js";
import { Input } from "../Input";
import Tag from "../Tag/Tag";
export const TagArea = (props) => {
    const [tagInput, setTagInput] = createSignal("");
    const [showSuggestions, setShowSuggestions] = createSignal(false);
    const filteredSuggestions = createMemo(() => (props.suggestions || []).filter((s) => s.name.toLowerCase().includes(tagInput().toLowerCase()) && !props.tags.some((t) => t.id === s.id)));
    const handleTagInput = async (e) => {
        if (e.key === "Enter" && tagInput().trim()) {
            e.preventDefault();
            const newTagName = tagInput().trim();
            if (!props.tags.map((t) => t.name).includes(newTagName)) {
                let newTag = undefined;
                newTag = await props.onCreateTag(newTagName);
                if (newTag)
                    props.setTags([...props.tags, newTag]);
            }
            setTagInput("");
            setShowSuggestions(false);
        }
        else {
            setShowSuggestions(true);
        }
    };
    const handleSuggestionClick = (tag) => {
        props.setTags([...props.tags, tag]);
        setTagInput("");
        setShowSuggestions(false);
    };
    const deleteTag = async (t) => {
        await props.onDeleteTag(t);
        props.setTags((props.tags || []).filter((tag) => tag.id !== t.id));
    };
    return (<div class="rounded-md p-2 flex flex-col bg-[var(--color-light-surface)] dark:bg-[var(--color-dark-surface)]">
      <div class="flex flex-wrap gap-2">
        <For each={props.tags || []}>
          {(t) => (<Tag title={t.name || ""} colorHex={t.colorHex || "#6b7280"} onClick={() => deleteTag(t)}/>)}
        </For>
        <div class="relative flex-1 min-w-[120px]">
          <Input label="" value={tagInput()} onChange={(v) => {
            setTagInput(v);
            setShowSuggestions(true);
        }} inputProps={{
            onKeyDown: handleTagInput,
            placeholder: props.placeholder || "Add tags (press Enter)",
            onFocus: () => setShowSuggestions(true),
            onBlur: () => setTimeout(() => setShowSuggestions(false), 100),
        }} class="w-full"/>
          <Show when={showSuggestions() && filteredSuggestions().length > 0}>
            <div class="absolute z-10 mt-1 w-full bg-[var(--color-light-surface)] dark:bg-[var(--color-dark-surface)] border border-[var(--color-light-muted)] dark:border-[var(--color-dark-muted)] rounded shadow-lg max-h-40 overflow-auto">
              <For each={filteredSuggestions()}>
                {(s) => (<div class="px-3 py-2 cursor-pointer hover:bg-[var(--color-light-muted)] dark:hover:bg-[var(--color-dark-muted)]" onMouseDown={() => handleSuggestionClick(s)}>
                    {s.name}
                  </div>)}
              </For>
            </div>
          </Show>
        </div>
      </div>
    </div>);
};
export default TagArea;
