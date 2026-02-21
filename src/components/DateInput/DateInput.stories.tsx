import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { createSignal, For } from "solid-js";
import DateInput from "./DateInput";

const meta: Meta<typeof DateInput> = {
  title: "Components/DateInput",
  component: DateInput,
};
export default meta;
type Story = StoryObj<typeof DateInput>;

const variants = [undefined, "ghost"] as const;
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
    const [date, setDate] = createSignal<Date | null>(null);
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
                        <h4 class="mb-1 mt-3 font-medium italic">
                          Size: {s}, Appearance: {a}
                        </h4>
                        <DateInput
                          label="Pick a date"
                          value={date()}
                          onChange={setDate}
                          variant={v}
                          appearance={a}
                          size={s}
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
