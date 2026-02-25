import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { createSignal } from "solid-js";
import ExternalLink from "lucide-solid/icons/external-link";

import { TagArea } from "./TagArea";
import { Button } from "../Button";
import { iconSize } from "../../constants";

const meta: Meta<typeof TagArea> = {
  title: "Components/TagArea",
  component: TagArea,
};
export default meta;
type Story = StoryObj<typeof TagArea>;

const initialTags: Tag[] = [
  { id: "1", name: "SolidJS", colorHex: "#10b981" },
  { id: "2", name: "UI", colorHex: "#3b82f6" },
];
const suggestions: Tag[] = [
  ...initialTags,
  { id: "3", name: "Component", colorHex: "#f59e0b" },
  { id: "4", name: "Design", colorHex: "#ef4444" },
];

export const Default: Story = {
  render: () => {
    const [tags, setTags] = createSignal<Tag[]>(initialTags);

    return (
      <TagArea
        tags={tags()}
        setTags={setTags}
        noSuggestionsPlaceholder="nothing here"
        suggestions={suggestions}
        onCreateTag={async (name) => ({ id: Math.random().toString(), name, colorHex: "#6b7280" })}
        onDeleteTag={async () => {}}
        dropDownAction={
          <Button variant="ghost" class="text-left">
            <ExternalLink class="h-[1em] w-[1em]" />
            See more
          </Button>
        }
      />
    );
  },
};
