import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { ThemeSwitch } from "./ThemeSwitch";
import Sun from "lucide-solid/icons/sun";
import Moon from "lucide-solid/icons/moon";

const meta: Meta = {
  title: "Components/ThemeSwitch",
  component: ThemeSwitch,
};
export default meta;

type Story = StoryObj<typeof ThemeSwitch>;

export const Basic: Story = {
  render: () => (
    <ThemeSwitch
      options={[
        {
          value: "light",
          label: (
            <span class="flex items-center gap-1">
              <Sun class="w-[1em] h-[1em]" /> Light
            </span>
          ),
        },
        {
          value: "dark",
          label: (
            <span class="flex items-center gap-1">
              <Moon class="w-[1em] h-[1em]" /> Dark
            </span>
          ),
        },
        {
          value: "aqua",
          label: <span class="flex items-center gap-1">Aqua</span>,
        },
        {
          value: "valentine",
          label: <span class="flex items-center gap-1">Valentine</span>,
        },
      ]}
    />
  ),
};
