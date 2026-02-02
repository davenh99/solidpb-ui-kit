import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { toaster } from "@kobalte/core/toast";

import { Toast, Toaster } from ".";
import { Container } from "../Container";
import { Button } from "../Button";

const meta: Meta<typeof Toast> = {
  title: "Components/Toast",
  component: Toast,
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Basic: Story = {
  render: () => (
    <Container>
      <Button
        onClick={() => {
          toaster.show((props) => (
            <Toast {...props} appearance="warning" title="JS Error" msg="sample msg" />
          ));
        }}
      >
        Make Toast
      </Button>
      <Toaster />
    </Container>
  ),
};
