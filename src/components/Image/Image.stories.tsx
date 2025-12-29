import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Image } from "./Image";

const meta: Meta<typeof Image> = {
  title: "Components/Image",
  component: Image,
};
export default meta;
type Story = StoryObj<typeof Image>;

export const Default: Story = {
  render: () => <Image src="https://placehold.co/100x100" alt="Placeholder" rounded />,
};
