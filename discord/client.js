const Discord = require('discord.js')

let _client
let _isReady = false
let _err = null
let _maxReadyChecks = 50

const { DISCORD_API_TOKEN } = process.env
_client = new Discord.Client()
_client.on('ready', () => { _isReady = true })
_client.on('error', (err) => { _err = err })
_client.login(DISCORD_API_TOKEN).catch(err => { _err = err })

function checkReady() {
  return new Promise((resolve, reject) => {
    let _readyChecks = 0
    function _check() {
      if (_err) return reject(_err)
      _readyChecks++
      if (_readyChecks > _maxReadyChecks) return reject(new Error('MAXIMUM_READY_CHECKS_REACHED'))
      if (_isReady) return resolve()
      setTimeout(() => {
        _check()
      }, 100)
    }
    _check()
  })
}

function getClient() {
  return new Promise((resolve, reject) => {
    if (_isReady) return resolve(_client)
    return checkReady().then(
        () => resolve(_client),
        () => reject(_err)
      )
  })
}

module.exports = {
  getClient,
}
