import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Card } from "./Card";
import { Container } from "../Container";
import { Button } from "../Button";
import { Input } from "../Input";
import { Link } from "../Link";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
};
export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Container class="flex justify-center items-center h-screen space-x-5">
      <Card class="items-center text-center w-70">
        <Card.Title class="justify-center">Login maybe</Card.Title>
        <Button modifier="block" appearance="primary">
          Click me
        </Button>
      </Card>
      <Card class="items-center text-center w-70">
        <Card.Title class="justify-center">Email maybe</Card.Title>
        <Input label="Email" />
        <Input label="Username" />
        <Button modifier="block" appearance="primary" class="mt-2">
          Click me
        </Button>
        <p>
          Try something else? <Link>Click here</Link>
        </p>
      </Card>
    </Container>
  ),
};
