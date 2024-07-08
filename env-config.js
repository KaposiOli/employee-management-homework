const { writeFileSync } = require("fs");
const { resolve } = require("path");
require("dotenv").config();

const targetPath = resolve("./src/environments/environment.ts");
const envConfigFile = `
export const environment = {
  production: false,
  clientId: "${process.env.CLIENT_ID}",
  clientSecret: "${process.env.CLIENT_SECRET}"
};
`;

writeFileSync(targetPath, envConfigFile, { encoding: "utf8" });
