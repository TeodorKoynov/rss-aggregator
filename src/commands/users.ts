import {readConfig, setUser} from "../config";
import {createUser, getUserByName, getUsers} from "../lib/db/queries/users";

export async function handlerLogin(cmdName: string, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error(`usage: ${cmdName} <name>`);
    }

    const userName = args[0]
    const user = await getUserByName(userName)

    if (!user) {
        throw new Error(`User ${userName} not found`);
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
    console.log('User created successfully');
}

export async function handleListUsers(cmdName: string) {
    const config = readConfig();

    const currentUser = await getUserByName(config.currentUserName)
    const users = await getUsers()

    for (const user of users) {
        const isCurrentUser = user.id === currentUser?.id;
        console.log(`* ${user.name}`, isCurrentUser ? "(current)" : "")
    }
}