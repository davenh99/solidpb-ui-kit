import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { createSignal } from "solid-js";
import { RelationPicker } from "./RelationPicker";

const meta: Meta<typeof RelationPicker> = {
  title: "Components/RelationPicker",
  component: RelationPicker,
};
export default meta;
type Story = StoryObj<typeof RelationPicker>;

const initialRelations: Tag[] = [
  { id: "1", name: "Parent", colorHex: "#10b981" },
  { id: "2", name: "Child", colorHex: "#3b82f6" },
];
const suggestions: Tag[] = [
  ...initialRelations,
  { id: "3", name: "Sibling", colorHex: "#f59e0b" },
  { id: "4", name: "Cousin", colorHex: "#ef4444" },
];

export const Default: Story = {
  render: () => {
    const [relations, setRelations] = createSignal<Tag[]>(initialRelations);
    return (
      <RelationPicker
        label="Relations"
        relations={relations()}
        setRelations={setRelations}
        suggestions={suggestions}
        onCreateRelation={async (name) => ({ id: Math.random().toString(), name, colorHex: "#6b7280" })}
        onDeleteRelation={async () => {}}
      />
    );
  },
};
