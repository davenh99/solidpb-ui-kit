import type { Meta, StoryObj } from "storybook-solidjs-vite";
import Drawer from "./Drawer";
import { createSignal } from "solid-js";

const meta: Meta<typeof Drawer> = {
  title: "Drawer",
  component: Drawer,
};
export default meta;

export const Basic: StoryObj<typeof Drawer> = {
  render: () => {
    const [open, setOpen] = createSignal(true);
    return (
      <>
        <button class="btn" onClick={() => setOpen(true)}>
          Open Drawer
        </button>
        <Drawer open={open()} onClose={() => setOpen(false)}>
          <ul class="menu p-4 w-80 bg-base-200 text-base-content">
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </Drawer>
      </>
    );
  },
};
