import {eq, sql} from "drizzle-orm";
import {db} from "../index";
import {feeds} from "../schema";

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

export async function markFeedFetched(feedId: string) {
    const [result] = await db
        .update(feeds)
        .set({
            lastFetchedAt: new Date(),
        })
        .where(eq(feeds.id, feedId))
        .returning();
    return result;
}

export async function getNextFeedToFetch() {
    const [result] = await db
        .select()
        .from(feeds)
        .orderBy(sql`${feeds.lastFetchedAt} asc nulls first`)
        .limit(1);
    return result;
}