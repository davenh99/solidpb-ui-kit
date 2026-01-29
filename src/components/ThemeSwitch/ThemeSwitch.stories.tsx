import type { Meta, StoryObj } from "storybook-solidjs";
import { ThemeSwitch } from "./ThemeSwitch";

const meta: Meta = {
  title: "Components/ThemeSwitch",
  component: ThemeSwitch,
};
export default meta;

type Story = StoryObj<typeof ThemeSwitch>;

export const Basic: Story = {
  render: () => <ThemeSwitch />,
};
