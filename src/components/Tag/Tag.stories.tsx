import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Tag } from "./Tag";
import { For } from "solid-js";

const meta: Meta<typeof Tag> = {
  title: "Components/Tag",
  component: Tag,
};
export default meta;
type Story = StoryObj<typeof Tag>;

const variants = ["none", "ghost", "outline", "dash", "soft"] as const;
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
    return (
      <div class="space-y-3">
        <div class="space-x-2">
          <For each={variants}>
            {(v) => {
              return <Tag title="Example tag" appearance="primary" variant={v} onClick={() => {}} />;
            }}
          </For>
        </div>
        <div class="space-x-2">
          <For each={appearances}>
            {(a) => {
              return <Tag title="Example tag" appearance={a} onClick={() => {}} />;
            }}
          </For>
        </div>
        <div class="space-x-2">
          <For each={sizes}>
            {(s) => {
              return <Tag title="Example tag" size={s} onClick={() => {}} />;
            }}
          </For>
        </div>
      </div>
    );
  },
};
