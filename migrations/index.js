#!/usr/bin/env node

require("dotenv").config();
const fs = require("fs-extra");
const program = require("commander");
const chalk = require("chalk");
const redis = require("@threadws/redis");
const logger = require("@threadws/logger");
const migration = require("./src/migrations");

const template = fs.readFileSync(`${__dirname}/template.js`, "utf-8");
const appPath = process.cwd();

program.command("make <name>").action(name => {
  fs.ensureDirSync(`${appPath}/migrations`);
  const filename = [Date.now(), name].join(".");
  fs.writeFileSync(`${appPath}/migrations/${filename}.js`, template);
});

program.command("run").action(async () => {
  const migratedTS = await redis.get("migrations:ts");
  let currentTs = migratedTS;
  const files = migration.getMigrations().filter(file => {
    return file && (migratedTS === null || migratedTS < file.ts);
  });
  if (files.length) {
    // eslint-disable-next-line no-restricted-syntax
    for (const file of files) {
      logger.info(chalk.green(`running migration ${file.name}`));
      // eslint-disable-next-line import/no-dynamic-require, global-require
      const migrationFile = require(`${file.path}`);
      // eslint-disable-next-line no-await-in-loop
      await migrationFile.up();
      currentTs = file.ts;
    }
    await redis.set("migrations:ts", currentTs);
  } else {
    logger.info(chalk.green(`No migrations found to run`));
  }
  redis.disconnect();
});

program.command("down").action(async () => {
  const currentTs = await redis.get("migrations:ts");
  const files = migration.getMigrations();
  const currentIndex = files.findIndex(file => file.ts === currentTs);
  // current migration exists - run down
  if (files[currentIndex]) {
    const file = files[currentIndex];
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const migrationFile = require(`${file.path}`);
    logger.info(chalk.green(`running down ${file.name}`));
    await migrationFile.down();
    const newTs = files[currentIndex - 1] ? files[currentIndex - 1].ts : 0;
    await redis.set("migrations:ts", newTs);
  } else {
    logger.error(chalk.red(`no migration found matching ${currentTs}`));
  }
  redis.disconnect();
});

program.parse(process.argv);
