/* eslint-disable no-restricted-syntax */
const fs = require("fs");

const packageDir = `${__dirname}/../packages`;

const dirs = fs.readdirSync(packageDir);
for (const dir of dirs) {
  const packageFile = fs.readFileSync(
    `${packageDir}/${dir}/package.json`,
    "utf-8"
  );
  const packageJSON = JSON.parse(packageFile);
  console.log(`@threadws/${dir}@${packageJSON.version}`);
}
