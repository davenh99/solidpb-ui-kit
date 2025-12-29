import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Card } from "./Card";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
};
export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => <Card>Card content</Card>,
};
