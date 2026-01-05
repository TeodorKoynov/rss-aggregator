import {setUser} from "../config";
import {createUser, getUserByName} from "../lib/db/queries/users";

export async function handlerLogin(cmdName: string, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error(`usage: ${cmdName} <name>`);
    }

    const userName = args[0]
    const user = await getUserByName(userName)

    if (!user) {
        throw new Error(`User does not exist!`);
    }

    setUser(user.name)
    console.log("User switched successfully!");
}

export async function handlerRegister(cmdName: string, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error(`usage: ${cmdName} <name>`);
    }

    const userName = args[0]
    const existing = await getUserByName(userName)
    if (existing) {
        throw new Error(`User already exists!`);
    }

    const user = await createUser(userName)
    setUser(user.name)
    console.log(`user was created ${JSON.stringify(user, null, 2)}`);
}