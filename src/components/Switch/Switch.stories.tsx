import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { createSignal, For } from "solid-js";
import { Switch } from "./Switch";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
};
export default meta;
type Story = StoryObj<typeof Switch>;

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

export const AllSwitches: Story = {
  render: () => {
    return (
      <div class="space-y-4">
        <For each={sizes}>
          {(s) => (
            <div>
              <h4 class="mt-2 font-bold">Size: {s}</h4>
              <div class="space-x-3">
                <For each={appearances}>
                  {(a) => <Switch label="Accept terms" appearance={a} size={s} class="my-1" />}
                </For>
              </div>
            </div>
          )}
        </For>
      </div>
    );
  },
};
