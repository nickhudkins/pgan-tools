function getCredentials() {
  let credentials
  try {
    const _credentials = require('./google.private.json')
    credentials = {
      client_email: _credentials.client_email,
      private_key: _credentials.private_key
    }
  } catch (e) {
    const {
      GOOGLE_DRIVE_API_PRIVATE_KEY,
      GOOGLE_DRIVE_CLIENT_EMAIL
    } = process.env

    if (!GOOGLE_DRIVE_CLIENT_EMAIL && !GOOGLE_DRIVE_API_PRIVATE_KEY) {
      throw new Error('COULD_NOT_RETRIEVE_CREDENTIALS')
    }

    credentials = {
      client_email: GOOGLE_DRIVE_CLIENT_EMAIL,
      private_key: GOOGLE_DRIVE_API_PRIVATE_KEY
    }
    console.log(credentials)
  }
  return credentials
}

module.exports = getCredentials
