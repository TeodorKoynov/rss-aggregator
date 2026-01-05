import fs from "fs";
import os from "os";
import path from "path";

type Config = {
    dbUrl: string;
    currentUserName: string;
}

export function setUser(userName: string) {
    const config = readConfig();
    config.currentUserName = userName;
    writeConfig(config);
}

export function readConfig() {
    const configPath = getConfigFilePath()
    const textConfig = fs.readFileSync(configPath, "utf-8");
    const rawConfig = JSON.parse(textConfig)
    return validateConfig(rawConfig);
}

function getConfigFilePath(): string {
    const paths = [os.homedir(), 'dev', 'bootdev', 'rss-aggregator', ".gatorconfig.json"]
    return path.join(...paths)
}

function writeConfig(config: Config): void {
    const configPath = getConfigFilePath()

    const rawConfig = {
        db_url: config.dbUrl,
        current_user_name: config.currentUserName
    }

    const configContent = JSON.stringify(rawConfig, null, 2)
    fs.writeFileSync(configPath, configContent, { encoding: 'utf8' })
}

function validateConfig(rawConfig: any) {
    if (typeof rawConfig !== "object" || rawConfig === null) {
        throw new Error("Config must be a JSON object");
    }

    if (!rawConfig.db_url || typeof rawConfig.db_url !== "string") {
        throw new Error("db_url is required in config file");
    }
    if (
        !rawConfig.current_user_name ||
        typeof rawConfig.current_user_name !== "string"
    ) {
        throw new Error("current_user_name is required in config file");
    }

    const config: Config = {
        dbUrl: rawConfig.db_url,
        currentUserName: rawConfig.current_user_name,
    };

    return config;
}