const chalk = require('chalk')
const { getClient } = require('./client')

module.exports = ({ dryRun }) => {
  return getClient()
    .then(client => {
      const pgan = client.guilds.first()
      console.log(chalk.bgYellow(chalk.black(`Listing Roles for [${pgan.name}]`)))
      console.log('\n')
      pgan.roles
        .map(({ name, id }) => ({ name, id }))
        .forEach(({ name, id }) => {
          console.log(`[${chalk.dim(id)}] ${chalk.yellow(name)}`)
        })
    })
}
