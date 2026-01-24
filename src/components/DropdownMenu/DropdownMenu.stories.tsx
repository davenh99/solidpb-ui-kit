import type { Meta, StoryObj } from "storybook-solidjs-vite";
import DropdownMenu from "./DropdownMenu";
import { Button } from "../Button";

const meta: Meta<typeof DropdownMenu> = {
  title: "Components/DropdownMenu",
  component: DropdownMenu,
};
export default meta;
type Story = StoryObj<typeof DropdownMenu>;

export const Default: Story = {
  render: () => (
    <DropdownMenu
      items={[
        { label: "Item 1", onSelect: () => {} },
        { label: "Item 2", onSelect: () => {} },
      ]}
      trigger={<Button appearance="neutral">Open Menu</Button>}
    />
  ),
};
