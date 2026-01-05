import { db } from "..";
import { users } from "../schema";
import {eq} from "drizzle-orm";

export async function createUser(name: string) {
    const [result] = await db.insert(users).values({ name: name }).returning();
    return result;
}

export async function getUserById(id: string) {
    return await db.query.users.findFirst({
        where: eq(users.id, id)
    })
}

export async function getUserByName(name: string) {
    return await db.query.users.findFirst({
        where: eq(users.name, name)
    })
}

export async function deleteUsers() {
    await db.delete(users)
}

export async function getUsers() {
    return await db.query.users.findMany()
}