import type { Meta, StoryObj } from "storybook-solidjs-vite";
import ActivityFeed from "./ActivityFeed";

const meta: Meta<typeof ActivityFeed> = {
  component: ActivityFeed,
  title: "Components/ActivityFeed",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    feed: [
      {
        id: "1",
        username: "John Doe",
        profileUrl: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
        message: "Just shared a new project update!",
        timeStamp: "12:45 PM",
      },
      {
        id: "2",
        username: "Jane Smith",
        profileUrl: "https://img.daisyui.com/images/stock/photo-1534890812127-a8ba63d9d3ab.webp",
        message: "Thanks for the feedback on the design!",
        timeStamp: "1:20 PM",
      },
      {
        id: "3",
        username: "Mike Johnson",
        profileUrl: "https://img.daisyui.com/images/stock/photo-1535713624532-430d66e9e0e5.webp",
        message: "Working on the new features for next release.",
        timeStamp: "2:15 PM",
      },
    ],
  },
};

export const SingleActivity: Story = {
  args: {
    class: "",
    feed: [
      {
        id: "1",
        username: "Alex Turner",
        profileUrl: "https://img.daisyui.com/images/stock/photo-1507003211169-0a1dd7228f2d.webp",
        message: "Started working on the ActivityFeed component",
        timeStamp: "Just now",
      },
    ],
  },
};

export const EmptyFeed: Story = {
  args: {
    class: "",
    feed: [],
  },
};

export const LongMessages: Story = {
  args: {
    class: "",
    feed: [
      {
        id: "1",
        username: "Sarah Williams",
        profileUrl: "https://img.daisyui.com/images/stock/photo-1494790108377-be9c29b29330.webp",
        message:
          "This is a longer activity message that contains more details about what happened. It might span multiple lines depending on the content and the width of the container.",
        timeStamp: "3:45 PM",
      },
      {
        id: "2",
        username: "Tom Brown",
        profileUrl: "https://img.daisyui.com/images/stock/photo-1500648767791-00dcc994a43e.webp",
        message: "Great work on the implementation! Everything looks good so far.",
        timeStamp: "4:20 PM",
      },
    ],
  },
};
