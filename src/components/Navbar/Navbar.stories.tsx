import type { ComponentMeta, ComponentStory } from "solid-js-storybook";
import Navbar from "./Navbar";
import Drawer from "../Drawer/Drawer";
import { createSignal } from "solid-js";

const meta: ComponentMeta<typeof Navbar> = {
  title: "Navbar",
  component: Navbar,
};
export default meta;

export const Basic: ComponentStory<typeof Navbar> = () => {
  const [drawerOpen, setDrawerOpen] = createSignal(false);
  return (
    <>
      <Navbar>
        <button class="btn btn-square btn-ghost" onClick={() => setDrawerOpen(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </Navbar>
      <Drawer open={drawerOpen()} onClose={() => setDrawerOpen(false)}>
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
};
