import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { FilterBar } from "./FilterBar";
import { Container } from "../Container";
import { Button } from "../Button";

const meta: Meta<typeof FilterBar> = {
  title: "Components/FilterBar",
  component: FilterBar,
};
export default meta;
type Story = StoryObj<typeof FilterBar>;

export const Default: Story = {
  render: () => (
    <Container class="flex justify-center items-center h-screen space-x-5">
      <div class="flex gap-2">
        <Button appearance="success">+ new</Button>
        <FilterBar />
      </div>
    </Container>
  ),
};
