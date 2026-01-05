import {readConfig} from "../config";
import {getUserByName} from "../lib/db/queries/users";
import {createFeed} from "../lib/db/queries/feeds";
import {Feed, User} from "../lib/db/schema";

export async function handlerAddFeed(cmdName: string, ...args: string[])  {
    if (args.length !== 2) {
        throw new Error(`usage: ${cmdName} <feed_name> <url>`);
    }
    const [feedName, url] = args

    const config = readConfig();

    const currentUser = await getUserByName(config.currentUserName)
    if (!currentUser) {
        throw new Error("You need to be logged in to add a feed.")
    }

    const feed = await createFeed(feedName, url, currentUser.id)
    if (!feed) {
        throw new Error(`Failed to create feed`);
    }

    console.log("Feed created successfully:");
    printFeed(feed, currentUser)
}

function printFeed(feed: Feed, user: User) {
    console.log(`* ID:            ${feed.id}`);
    console.log(`* Created:       ${feed.createdAt}`);
    console.log(`* Updated:       ${feed.updatedAt}`);
    console.log(`* name:          ${feed.name}`);
    console.log(`* URL:           ${feed.url}`);
    console.log(`* User:          ${user.name}`);
}