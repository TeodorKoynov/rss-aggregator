import {CommandsRegistry, registerCommand, runCommand} from "./commands";
import {handleListUsers, handlerLogin, handlerRegister} from "./commands/users";
import {handlerReset} from "./commands/reset";
import {handlerAgg} from "./commands/aggregate";
import {handlerAddFeed} from "./commands/feeds";

async function main() {
    const args = process.argv.slice(2);

    if (args.length < 1) {
        console.log("usage: cli <command> [args...]");
        process.exit(1)
    }

    const cmdName = args[0];
    const cmdArgs = args.slice(1);
    const registry: CommandsRegistry = {}

    registerCommand(registry, "login", handlerLogin)
    registerCommand(registry, "register", handlerRegister)
    registerCommand(registry, "reset", handlerReset)
    registerCommand(registry, "users", handleListUsers)
    registerCommand(registry, "agg", handlerAgg)
    registerCommand(registry, "addfeed", handlerAddFeed)

    try {
        await runCommand(registry, cmdName, ...cmdArgs);
    } catch (err) {
        if (err instanceof Error) {
            console.error(`Error running command ${cmdName}: ${err.message}`);
        } else {
            console.error(`Error running command ${cmdName}: ${err}`);
        }
        process.exit(1);
    }
    process.exit(0)
}

main();