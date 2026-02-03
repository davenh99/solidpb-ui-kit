import type { Meta, StoryObj } from "storybook-solidjs-vite";
import BreadCrumbs from "./BreadCrumbs";

const meta: Meta<typeof BreadCrumbs> = {
  component: BreadCrumbs,
  title: "Components/BreadCrumbs",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Documents", href: "/documents" },
      { label: "Add Document" },
    ],
  },
};

export const WithClickHandlers: Story = {
  args: {
    items: [
      {
        label: "Home",
        onClick: () => console.log("Home clicked"),
      },
      {
        label: "Documents",
        onClick: () => console.log("Documents clicked"),
      },
      { label: "Add Document" },
    ],
  },
};

export const LongPath: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Projects", href: "/projects" },
      { label: "Web App", href: "/projects/web-app" },
      { label: "Components", href: "/projects/web-app/components" },
      { label: "BreadCrumbs" },
    ],
  },
};
