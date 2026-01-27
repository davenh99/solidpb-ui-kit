import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { TextArea } from "./TextArea";
import { For } from "solid-js";

const meta: Meta<typeof TextArea> = {
  title: "Components/TextArea",
  component: TextArea,
};
export default meta;
type Story = StoryObj<typeof TextArea>;

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
  render: () => (
    <div class="space-y-3">
      <div class="space-x-2">
        <h2 class="my-3">Appearances:</h2>
        <For each={appearances}>
          {(a) => {
            return (
              <TextArea label="Example textarea" appearance={a} textareaProps={{ placeholder: "Test" }} />
            );
          }}
        </For>
      </div>
      <div class="space-x-2">
        <h2 class="my-3">Sizes:</h2>
        <For each={sizes}>
          {(s) => {
            return <TextArea label="Example textarea" size={s} />;
          }}
        </For>
      </div>
    </div>
  ),
};
