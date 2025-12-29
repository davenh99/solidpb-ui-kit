import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Form } from "./Form";

const meta: Meta<typeof Form> = {
  title: "Components/Form",
  component: Form,
};
export default meta;
type Story = StoryObj<typeof Form>;

export const Default: Story = {
  render: () => <Form>Form content</Form>,
};
