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
    const [open, setOpen] = createSignal(false);

    return (
      <div>
        <Button onClick={() => setOpen(true)}>Open AlertDialog</Button>
        <AlertDialog
          open={open()}
          onOpenChange={setOpen}
          title="Delete item"
          description="Are you sure you want to delete this item?"
          buttons={
            <>
              <AlertDialog.Button appearance="neutral" onClick={() => setOpen(false)}>
                Cancel
              </AlertDialog.Button>
              <AlertDialog.Button appearance="success">Confirm</AlertDialog.Button>
            </>
          }
        />
      </div>
    );
  },
};
