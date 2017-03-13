const chalk = require('chalk')
const { getClient } = require('./client')
const { getMasterDatabase } = require('../google')

function mockCreateRole(opts) {
  return Promise.resolve(opts)
}

module.exports = ({ dryRun }) => {
  return Promise.all([
    getClient(),
    getMasterDatabase(),
  ])
  .then(([client, mdb]) => {
    const pgan = client.guilds.first()
    const createRole = dryRun ? mockCreateRole : (opts) => pgan.createRole(opts)
    console.log(chalk.bgYellow(chalk.black(`Generating Roles for [${pgan.name}]`)))

    if (!dryRun) {
      console.log(chalk.bgRed(chalk.white('  ACTUALLY CREATING  ')))
    }

    console.log('\n')

    const locationNames = mdb.map(({ twitterurl }) => twitterurl.replace('https://twitter.com/', ''))
    const loweredLocationNames = locationNames.map((n) => n.toLowerCase())

    let _existingNames = []
    let _maybeExistingNames = []

    const existingLocationRoles = pgan.roles.filter(({ name }) => {
      _existingNames.push(name) // Don't do this. Side Effects like this make me :(
      return locationNames.includes(name)
    })
    const possiblyExistingRoles = pgan.roles.filter(({ name }) => {
      if (_existingNames.includes(name)) return false // We have already seen this.
      _maybeExistingNames.push(name.toLowerCase())
      return loweredLocationNames.includes(name.toLowerCase())
    })

    console.log(chalk.blue(`Found ${chalk.bgBlue(' ' + chalk.white(existingLocationRoles.size) + ' ')} existing roles...`))
    existingLocationRoles.forEach(({ name }) => {
      console.log(`  - ${name}`)
    })

    console.log(chalk.blue(`Found ${chalk.bgBlue(' ' + chalk.white(possiblyExistingRoles.size) + ' ')} possibly existing roles...`))
    possiblyExistingRoles.forEach(({ name }) => {
      console.log(`  ${name}`)
    })

    const absolutelyCreate = locationNames.filter((name) => {
      const mayMatch = _maybeExistingNames.includes(name.toLowerCase())
      const doesMatch = _existingNames.includes(name)
      return !mayMatch & !doesMatch
    })

    console.log('\n')
    console.log(chalk.green(`Creating ${chalk.bgGreen(' ' + chalk.black.bold(absolutelyCreate.length) + ' ')} new roles...`))

    /*
     * Poor Man's Rate Limiting ;)
     */
    function createRoles(absolutelyCreate) {
      return new Promise((resolve) => {
        function _createRoles(absolutelyCreate) {
          if (absolutelyCreate.length === 0) resolve()
          if (absolutelyCreate.length > 0) {
            const name = absolutelyCreate.shift()
            createRole({
              name,
              mentionable: true
            }).then((role) => {
              console.log(`  [${chalk.green('✓')}] ${chalk.yellow(role.name)}`)
              setTimeout(() => {
                _createRoles(absolutelyCreate)
              }, 100) // See! I told you. Rate Limiting...
            })
          }
        }
        _createRoles(absolutelyCreate)
      })
    }
    return createRoles(absolutelyCreate)
  })
}
