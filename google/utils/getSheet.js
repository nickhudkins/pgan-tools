const GoogleSpreadsheet = require('google-spreadsheet')
const getCredentials = require('./getCredentials')

const {
  GOOGLE_SPREADSHEET_KEY
} = process.env

module.exports = (sheetName, { limit = 1000 } = {}) => {
  return new Promise((resolve, reject) => {
    const _document = new GoogleSpreadsheet(GOOGLE_SPREADSHEET_KEY)
    const credentials = getCredentials()
    _document.useServiceAccountAuth(credentials, () => {
      _document.getInfo((err, info) => {
        if (err) return reject(err)
        const [ sheet ] = info.worksheets.filter(({ title }) => title === sheetName)
        sheet.getRows({
          offset: 1,
          limit
        }, (err, rows) => {
          if (err) return reject(err)
          resolve(rows)
        })
      })
    })
  })
}
