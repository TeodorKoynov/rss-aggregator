import { getFeedByURL } from "src/lib/db/queries/feeds";
import {
    createFeedFollow,
    getFeedFollowsForUser,
} from "../lib/db/queries/feed-follows";
import { readConfig } from "src/config";
import { getUserByName } from "src/lib/db/queries/users";

export async function handlerFollow(cmdName: string, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error(`usage: ${cmdName} <feed_url>`);
    }

    const config = readConfig();
    const currentUser = await getUserByName(config.currentUserName);

    if (!currentUser) {
        throw new Error(`User ${config.currentUserName} not found`);
    }

    const feedURL = args[0];
    const feed = await getFeedByURL(feedURL);
    if (!feed) {
        throw new Error(`Feed not found: ${feedURL}`);
    }

    const ffRow = await createFeedFollow(currentUser.id, feed.id);

    console.log(`Feed follow created:`);
    printFeedFollow(ffRow.userName, ffRow.feedName);
}

export async function handlerListFeedFollows(_: string) {
    const config = readConfig();
    const currentUser = await getUserByName(config.currentUserName);

    if (!currentUser) {
        throw new Error(`User ${config.currentUserName} not found`);
    }

    const feedFollows = await getFeedFollowsForUser(currentUser.id);
    if (feedFollows.length === 0) {
        console.log(`No feed follows found for this user.`);
        return;
    }

    console.log(`Feed follows for user %s:`, currentUser.id);
    for (let ff of feedFollows) {
        console.log(`* %s`, ff.feedName);
    }
}

export function printFeedFollow(username: string, feedName: string) {
    console.log(`* User:          ${username}`);
    console.log(`* Feed:          ${feedName}`);
}
