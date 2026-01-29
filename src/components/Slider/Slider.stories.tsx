import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { createSignal, For } from "solid-js";
import { Slider } from "./Slider";

const meta: Meta<typeof Slider> = {
  title: "Components/Slider",
  component: Slider,
};
export default meta;
type Story = StoryObj<typeof Slider>;

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
    const [value, setValue] = createSignal(30);
    const [savedValue, setSavedValue] = createSignal(0);

    return (
      <div class="flex flex-col space-y-4">
        <div class="space-y-1">
          <For each={appearances}>
            {(a) => (
              <Slider
                min={0}
                max={100}
                value={value()}
                onChange={setValue}
                appearance={a}
                saveFunc={async (v) => {
                  setSavedValue(v);
                }}
              />
            )}
          </For>
        </div>
        <div class="flex flex-col space-y-1">
          <For each={sizes}>
            {(s) => <Slider min={0} max={100} value={value()} onChange={setValue} size={s} step={5} />}
          </For>
        </div>
        <div>
          <p>value: {value()}</p>
          <p>savedValue: {savedValue()}</p>
        </div>
      </div>
    );
  },
};
