import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { createSignal, For } from "solid-js";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
};
export default meta;
type Story = StoryObj<typeof Checkbox>;

const appearances = [
  "primary",
  "success",
  "warning",
  "neutral",
  "error",
  "secondary",
  "info",
  "accent",
] as const;
const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

export const AllCheckboxes: Story = {
  render: () => {
    return (
      <div class="space-y-4">
        <For each={sizes}>
          {(s) => (
            <div>
              <h4 class="mt-2 font-bold">Size: {s}</h4>
              <For each={[false, true]}>
                {(c) => (
                  <div class="space-x-3">
                    <h5 class="mt-2 font-bold">{c ? "Checked" : "Unchecked"}</h5>
                    <For each={appearances}>
                      {(a) => (
                        <Checkbox label="Accept terms" appearance={a} size={s} checked={c} class="my-1" />
                      )}
                    </For>
                  </div>
                )}
              </For>
            </div>
          )}
        </For>
      </div>
    );
  },
};
