import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Tabs } from "./Tabs";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
};
export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => <Tabs>Tabs content</Tabs>,
};
