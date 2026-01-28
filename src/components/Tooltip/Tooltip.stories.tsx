import { createSignal } from "solid-js";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import Info from "lucide-solid/icons/info";

import { Tooltip } from "./Tooltip";
import { Button } from "../Button";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
};
export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => {
    return (
      <div class="space-y-10">
        <Tooltip content={<span>Tooltip content</span>}>
          <Button>Btn with tooltip</Button>
        </Tooltip>
        <p>
          click or hover the icon:{" "}
          <Tooltip content={<p>cool!</p>} appearance="primary">
            <Info />
          </Tooltip>
        </p>
        <Tooltip content={<span>Another tooltip</span>} class="tooltip-open" appearance="warning">
          <Button>tooltip open</Button>
        </Tooltip>
      </div>
    );
  },
};
