import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { createSignal, For } from "solid-js";
import { NumberInput } from "./NumberInput";

const meta: Meta<typeof NumberInput> = {
  title: "Components/NumberInput",
  component: NumberInput,
};
export default meta;
type Story = StoryObj<typeof NumberInput>;

const variants = ["none", "ghost"] as const;
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
    const [value, setValue] = createSignal(0);
    return (
      <div class="space-y-4">
        <For each={variants}>
          {(v) => (
            <div>
              <h3 class="mt-5 mb-1 font-bold">Variant: {v}</h3>
              <For each={sizes}>
                {(s) => (
                  <For each={appearances}>
                    {(a) => (
                      <div class="space-x-3">
                        <h4 class="mb-1 font-medium">
                          Size: {s}, Appearance: {a}
                        </h4>
                        <NumberInput
                          size={s}
                          appearance={a}
                          variant={v}
                          label="Age"
                          rawValue={value()}
                          onRawValueChange={(v) => setValue(Number(v))}
                        />
                      </div>
                    )}
                  </For>
                )}
              </For>
            </div>
          )}
        </For>
      </div>
    );
  },
};
