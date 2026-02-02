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
    <div class="space-x-2">
      <DropdownMenu>
        <DropdownMenu.Trigger>
          <Button appearance="neutral" size="xs">
            Open Menu (xs)
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content size="xs">
          <DropdownMenu.MenuItem onSelect={() => {}}>
            <a>Item 1</a>
          </DropdownMenu.MenuItem>
          <DropdownMenu.MenuItem onSelect={() => {}}>
            <a>Item 2</a>
          </DropdownMenu.MenuItem>
        </DropdownMenu.Content>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenu.Trigger>
          <Button size="lg">Open Menu (lg)</Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content size="lg">
          <DropdownMenu.MenuItem onSelect={() => {}}>
            <a>Item 1</a>
          </DropdownMenu.MenuItem>
          <DropdownMenu.MenuItem onSelect={() => {}}>
            <a>Item 2</a>
          </DropdownMenu.MenuItem>
          <DropdownMenu.MenuItem onSelect={() => {}}>
            <a>Item 3</a>
          </DropdownMenu.MenuItem>
        </DropdownMenu.Content>
      </DropdownMenu>
    </div>
  ),
};
