#!/usr/bin/env node

require('dotenv').config()
const fs = require('fs-extra')
const program = require('commander')
const commands = require('./src/commands')

const template = fs.readFileSync(`${__dirname}/template.js`, 'utf-8')
const appPath = process.cwd()

program.command('make <name>').action(name => {
  fs.ensureDirSync(`${appPath}/migrations`)
  const filename = [Date.now(), name].join('.')
  fs.writeFileSync(`${appPath}/migrations/${filename}.js`, template)
  process.exit();
})

program.command('run').action(async () => {
  await commands.run()
  process.exit()
})
program.command('down').action(async () => {
  await commands.down()
  process.exit()
})
program.command('teardown').action(async () => {
  await commands.teardown()
  process.exit()
})

program.parse(process.argv)
