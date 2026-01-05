import {readConfig, setUser} from "./config";

function main() {
    setUser("Test")
    const config = readConfig()
    console.log(config);
}

main();