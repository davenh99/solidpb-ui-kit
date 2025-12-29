import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Modal } from "./Modal";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
};
export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: () => <Modal>Modal content</Modal>,
};
