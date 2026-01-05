import { db } from "..";
import { users } from "../schema";
import {eq} from "drizzle-orm";

export async function createUser(name: string) {
    const [result] = await db.insert(users).values({ name: name }).returning();
    return result;
}

export async function getUserByName(name: string) {
    return await db.query.users.findFirst({
        where: eq(users.name, name)
    })
}