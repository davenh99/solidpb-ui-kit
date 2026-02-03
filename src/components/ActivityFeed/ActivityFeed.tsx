import { Component, For } from "solid-js";
import { tv } from "tailwind-variants";
import { Input } from "../Input";

export interface FeedItem {
  id: string;
  username: string;
  profileUrl: string;
  message: string;
  timeStamp: string;
}

export interface ActivityFeedProps {
  // feed should be sorted externally before using here
  feed: FeedItem[];
  class?: string;
}

const activityFeed = tv({
  base: "bg-base-100 w-100 min-h-full border-l border-l-base-300 p-3",
});

export const ActivityFeed: Component<ActivityFeedProps> = (props) => {
  return (
    <div class={activityFeed({ class: props.class })}>
      <Input />
      <div>
        <For each={props.feed}>
          {(feedItem) => (
            <div class="chat chat-start">
              <div class="chat-image avatar">
                <div class="w-10 rounded-full">
                  <img src={feedItem.profileUrl} />
                </div>
              </div>
              <div class="chat-header">
                {feedItem.username}
                <time class="text-xs opacity-50">{feedItem.timeStamp}</time>
              </div>
              <div class="chat-bubble text-sm">{feedItem.message}</div>
            </div>
          )}
        </For>
      </div>
    </div>
  );
};

export default ActivityFeed;
