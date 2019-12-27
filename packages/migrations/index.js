#!/usr/bin/env node

require("dotenv").config();
const fs = require("fs-extra");
const program = require("commander");
const commands = require("./src/commands");

const template = fs.readFileSync(`${__dirname}/template.js`, "utf-8");
const appPath = process.cwd();

program.command("make <name>").action(name => {
  fs.ensureDirSync(`${appPath}/migrations`);
  const filename = [Date.now(), name].join(".");
  fs.writeFileSync(`${appPath}/migrations/${filename}.js`, template);
});

program.command("run").action(commands.run);
program.command("down").action(commands.down);
program.command("teardown").action(commands.teardown);

program.parse(process.argv);
