import { createMemo } from "solid-js";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { ColumnDef } from "@tanstack/solid-table";

import { List } from "./List";

const meta: Meta<typeof List> = {
  title: "Components/List",
  component: List,
};
export default meta;
type Story = StoryObj<typeof List>;

interface DataType {
  name: string;
  description: string;
}

const data: DataType[] = [
  { name: "item 1", description: "description 1" },
  { name: "item 2", description: "description 2" },
  { name: "item 3", description: "description 3" },
  { name: "item 4", description: "description 4" },
  { name: "item 5", description: "description 5" },
  { name: "item 6", description: "description 6" },
];

const columns: ColumnDef<DataType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
];

export const Default: Story = {
  render: () => (
    <List<DataType>
      columns={createMemo(() => columns)}
      data={createMemo(() => data)}
      onRowClick={(r) => alert(`${r.name} clicked`)}
    />
  ),
};
