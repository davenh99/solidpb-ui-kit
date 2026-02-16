import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { createSignal, For } from "solid-js";
import { Select } from "./Select";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
};
export default meta;
type Story = StoryObj<typeof Select>;

const appearances = [
  "primary",
  "secondary",
  "accent",
  "success",
  "warning",
  "neutral",
  "error",
  "info",
] as const;
const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

export const Default: Story = {
  render: () => {
    const [value, setValue] = createSignal({ label: "", value: "" });
    return (
      <div class="flex flex-col space-y-4">
        <div class="space-y-1">
          <For each={appearances}>
            {(a) => (
              <Select
                label="Choose option"
                labelKey="label"
                valueKey="value"
                options={[
                  { label: "Option 1", value: "1" },
                  { label: "Option 2", value: "2" },
                ]}
                value={value()}
                onChange={setValue}
                appearance={a}
              />
            )}
          </For>
        </div>
        <div class="space-y-1">
          <For each={sizes}>
            {(s) => (
              <Select
                label="Choose option"
                labelKey="label"
                valueKey="value"
                options={[
                  { label: "Option 1", value: "1" },
                  { label: "Option 2", value: "2" },
                ]}
                value={value()}
                onChange={setValue}
                size={s}
              />
            )}
          </For>
        </div>
      </div>
    );
  },
};
