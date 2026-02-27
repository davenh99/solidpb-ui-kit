import { Component } from "solid-js";
export interface FeedItem {
    username: string;
    profileUrl: string;
    message: string;
    timeStamp: string;
}
export interface ActivityFeedProps {
    feed: FeedItem[];
    class?: string;
    profileUrl: string;
    username: string;
    onMessageCreate?: (msg: string) => void;
}
export declare const ActivityFeed: Component<ActivityFeedProps>;
export default ActivityFeed;
