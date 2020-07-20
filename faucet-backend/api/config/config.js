// Read config from config.json and export
import fs from "fs";
import path from "path";

const configPath = path.resolve("api/config/config.json");

const rawdata = fs.readFileSync(configPath);
const config = JSON.parse(rawdata);

export default config;
