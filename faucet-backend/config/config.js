// Read config from config.json and export
import fs from "fs";
import path from "path";

const configPath = path.resolve("config/config.json");
const artifactPath = path.resolve("config/HarmonyFaucet.json");

export const config = JSON.parse(fs.readFileSync(configPath));
export const artifact = JSON.parse(fs.readFileSync(artifactPath));

export default config;
