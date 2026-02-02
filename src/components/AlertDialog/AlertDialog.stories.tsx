import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { AlertDialog } from ".";
import { Button } from "../Button";
import { createSignal } from "solid-js";

const meta: Meta<typeof AlertDialog> = {
  title: "Components/AlertDialog",
  component: AlertDialog,
};

export default meta;
type Story = StoryObj<typeof AlertDialog>;

export const Default: Story = {
  render: () => {
    return (
      <div>
        <AlertDialog id="alert123">
          <AlertDialog.Trigger>Open alert</AlertDialog.Trigger>
          <AlertDialog.Content title="Delete Item">
            <span>Are you sure you want to delete this item?</span>
            <AlertDialog.Buttons>
              <AlertDialog.Trigger appearance="neutral">Cancel</AlertDialog.Trigger>
              <AlertDialog.Button appearance="success">Confirm</AlertDialog.Button>
            </AlertDialog.Buttons>
          </AlertDialog.Content>
        </AlertDialog>
      </div>
    );
  },
};
