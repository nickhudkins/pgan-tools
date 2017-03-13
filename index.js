require('dotenv').config()
const meow = require('meow')

const cli = meow(`
  Usage
    $ pgan-tools <cmd>
  Commands
    createRoles             This will create roles in Discord for all regions defined in the Master Google Spreadsheet
    listRoles               This will list existing roles in Discord
  Options
    --dry-run, --jk, -d     This will perform a dry run of any tool. Shwew.
`, {
  alias: {
    'jk': 'dry-run',
    'd': 'dry-run'
  }
})

const cmd = cli.input[0].toLowerCase()
const { dryRun = false } = cli.flags
let thingToDo

switch (cmd) {
  case 'createroles':
    thingToDo = require('./discord/createRoles')
    break
  case 'listroles':
    thingToDo = require('./discord/listRoles')
    break
  default:
    thingToDo = () => console.log('I did nothing. Just like you asked.')
}

thingToDo({ dryRun })
  .then(() => {
    process.exit(0)
  })
  .catch((err) => {
    console.error(err)
  })
