import type { Meta, StoryObj } from "storybook-solidjs-vite";
import Link from "./Link";

const meta: Meta<typeof Link> = {
  title: "Components/Link",
  component: Link,
};
export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = {
  render: () => (
    <div>
      <p>
        This is an <Link href="https://example.com">Example Link</Link>
      </p>
      <p>
        Here is another{" "}
        <Link href="https://example.com" appearance="primary">
          Link
        </Link>
      </p>
    </div>
  ),
};
