import {db} from "../index";
import {feeds} from "../schema";
import {eq} from "drizzle-orm";

export async function createFeed(feedName: string, url: string, userId: string) {
    const [result] = await db.insert(feeds).values({ name: feedName, url, userId }).returning();
    return result;
}

export async function getFeeds() {
    return await db.query.feeds.findMany()
}

export async function getFeedByURL(url: string) {
    return await db.query.feeds.findFirst({
        where: eq(feeds.url, url)
    })

}