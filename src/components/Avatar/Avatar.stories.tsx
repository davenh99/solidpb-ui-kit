import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Avatar } from "./Avatar";
import { For } from "solid-js";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
};
export default meta;
type Story = StoryObj<typeof Avatar>;

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

export const AllAvatars: Story = {
  render: () => {
    return (
      <For each={sizes}>
        {(s) => (
          <div>
            <h4 class="mt-2 font-bold">Size: {s}</h4>
            <div class="space-x-3">
              <Avatar src="https://placehold.co/100x100" alt="Placeholder" size={s} />
              <Avatar fallback="FB" alt="Placeholder" size={s} class="bg-base-300" />
            </div>
          </div>
        )}
      </For>
    );
  },
};
