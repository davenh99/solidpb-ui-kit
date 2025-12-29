import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Container } from "./Container";

const meta: Meta<typeof Container> = {
  title: "Components/Container",
  component: Container,
};
export default meta;
type Story = StoryObj<typeof Container>;

export const Default: Story = {
  render: () => <Container>Container content</Container>,
};
