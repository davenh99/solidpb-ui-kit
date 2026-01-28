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
    <div>
      {" "}
      <DropdownMenu
        items={[
          { label: "Item 1", onSelect: () => {} },
          { label: "Item 2", onSelect: () => {} },
        ]}
        size="xs"
        trigger={<Button appearance="neutral">Open Menu</Button>}
      />
      <DropdownMenu
        items={[
          { label: "Item 1", onSelect: () => {} },
          { label: "Item 2", onSelect: () => {} },
        ]}
        size="lg"
        trigger={<Button appearance="neutral">Open Menu</Button>}
      />
    </div>
  ),
};
