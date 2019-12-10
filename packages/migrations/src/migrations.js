const fs = require("fs");
const logger = require("@threadws/logger");

const appPath = process.cwd();

const getThirdPartyPaths = () => {
  let thirdParty = false;
  try {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    thirdParty = require(`${appPath}/migrations.config.js`);
  } catch (e) {
    logger.debug("No migrations config found in project.");
  }
  const paths = [];
  if (thirdParty.length) {
    thirdParty.forEach(tp => {
      paths.push(`${appPath}/node_modules/${tp.module}/migrations`);
    });
  }
  return paths;
};

const loadMigrations = directory => {
  try {
    const files = fs.readdirSync(directory);
    return files.map(file => {
      const [ts, name] = file.split(".");
      return {
        path: `${directory}/${file}`,
        name,
        ts
      };
    });
  } catch (e) {
    logger.info(`No Migrations found at ${directory}`);
    return [];
  }
};

const getMigrations = () => {
  const paths = [...getThirdPartyPaths(), `${appPath}/migrations`];
  return paths
    .map(path => loadMigrations(path))
    .flat()
    .sort((a, b) => a.ts - b.ts);
};

module.exports = {
  getMigrations,
  getThirdPartyPaths,
  loadMigrations
};
