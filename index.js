require('dotenv').config()
const meow = require('meow')

const cli = meow(`
  Usage
    $ pgan-tools <cmd>
  Commands
    createRoles       This will create roles in Discord for all regions defined in the Master Google Spreadsheet
  Options
    --dry, -d, --jk   This will perform a dry run of any tool. Shwew.
`, {
  alias: {
    'jk': 'dry',
    'd': 'dry'
  }
})

const cmd = cli.input[0].toLowerCase()
const { dryRun = true } = cli.flags
let thingToDo

switch (cmd) {
  case 'createroles':
    thingToDo = require('./discord/createRoles')
    break
  default:
    thingToDo = () => console.log('I did nothing. Just like you asked.')
}

thingToDo(dryRun)
  .then(() => {
    process.exit(0)
  })
  .catch((err) => {
    console.error(err)
  })
