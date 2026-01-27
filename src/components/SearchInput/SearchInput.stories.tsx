import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { createSignal, For } from "solid-js";
import { SearchInput } from "./SearchInput";

const meta: Meta<typeof SearchInput> = {
  title: "Components/SearchInput",
  component: SearchInput,
};
export default meta;
type Story = StoryObj<typeof SearchInput>;

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
    const [value, setValue] = createSignal("");
    return (
      <div class="my-2">
        <div>
          <For each={appearances}>
            {(a) => <SearchInput value={value()} onChange={setValue} appearance={a} class="my-1" />}
          </For>
        </div>
        <div>
          <For each={sizes}>
            {(s) => <SearchInput value={value()} onChange={setValue} size={s} class="my-1" />}
          </For>
        </div>
      </div>
    );
  },
};
