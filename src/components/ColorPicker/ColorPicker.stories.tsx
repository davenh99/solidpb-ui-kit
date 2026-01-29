import type { Meta, StoryObj } from "storybook-solidjs";
import { ColorPicker } from "./ColorPicker";
import { createSignal } from "solid-js";

const meta: Meta = {
  title: "Components/ColorPicker",
  component: ColorPicker,
};
export default meta;

type Story = StoryObj<typeof ColorPicker>;

export const Basic: Story = {
  render: () => {
    const [color, setColor] = createSignal("#ff0000");
    return (
      <div>
        <ColorPicker value={color()} onChange={setColor} />
        <div style={{ marginTop: "1rem" }}>
          Selected: <span style={{ color: color() }}>{color()}</span>
        </div>
      </div>
    );
  },
};
