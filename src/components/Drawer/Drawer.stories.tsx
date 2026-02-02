import type { Meta, StoryObj } from "storybook-solidjs-vite";
import Activity from "lucide-solid/icons/activity";
import Ambulance from "lucide-solid/icons/ambulance";
import ThumbsDown from "lucide-solid/icons/thumbs-down";

import Drawer from "./Drawer";

const meta: Meta<typeof Drawer> = {
  title: "Drawer",
  component: Drawer,
};
export default meta;

export const Basic: StoryObj<typeof Drawer> = {
  render: () => {
    return (
      <Drawer id="drawer-1">
        <Drawer.Content>
          <Drawer.Trigger class="lg:hidden">
            <span>open draw</span>
          </Drawer.Trigger>
          <p>what</p>
        </Drawer.Content>
        <Drawer.Drawer>
          <Drawer.Trigger class="hidden lg:flex">
            <span>open draw</span>
          </Drawer.Trigger>
          <Drawer.Menu>
            <Drawer.MenuItem icon={<Activity />} label="Item 1" />
            <Drawer.MenuItem icon={<Ambulance />} label="Item 2" />
            <Drawer.MenuItem icon={<ThumbsDown />} label="Item 3" />
          </Drawer.Menu>
        </Drawer.Drawer>
      </Drawer>
    );
  },
};
