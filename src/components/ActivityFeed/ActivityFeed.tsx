import { Component, createSignal, For } from "solid-js";
import { tv } from "tailwind-variants";
import { Avatar } from "../Avatar";
import { TextArea } from "../TextArea";
import { Button } from "../Button";

export interface FeedItem {
  username: string;
  profileUrl: string;
  message: string;
  timeStamp: string;
}

export interface ActivityFeedProps {
  // feed should be sorted externally before using here
  feed: FeedItem[];
  class?: string;
  profileUrl: string;
  username: string;
  // time is not passed in as we will just use the db 'created' time later.
  onMessageCreate?: (msg: string) => void;
}

const activityFeed = tv({
  base: "bg-base-100 w-100 min-h-full border-l border-l-base-300 p-3",
});

export const ActivityFeed: Component<ActivityFeedProps> = (props) => {
  const [feed, setFeed] = createSignal(props.feed);
  const [input, setInput] = createSignal("");

  const handleSubmit = () => {
    props.onMessageCreate?.(input());
    const date = new Date();
    const dateString = date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    setFeed([
      ...feed(),
      { username: props.username, profileUrl: props.profileUrl, message: input(), timeStamp: dateString },
    ]);
    setInput("");
  };

  return (
    <div class={activityFeed({ class: props.class })}>
      <div class="mb-2">
        <div class="flex items-start gap-2.5">
          <Avatar src={props.profileUrl} class="w-10" />
          <div class="space-y-1 flex-1">
            <TextArea textareaProps={{ autoResize: true }} value={input()} onChange={setInput} />
            <div>
              <Button size="sm" appearance="primary" onClick={handleSubmit}>
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <For each={feed().reverse()}>
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
