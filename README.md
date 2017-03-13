PGAN Tools
===

## Getting Started
_**Note**: You REALLY should be running `nvm` so, go get that. If not, go install NodeJS 7.6.0 or greater. It's not 1974._

`$ npm install`

The installation process WILL complain about some peerDependencies:
  - erlpack@hammerandchisel/erlpack#master
  - node-opus@^0.2.0
  - opusscript@^0.0.1
  - uws@^0.12.0

They are NOT required for our use, as we do not use Voice / Video APIs of Discord

You'll want to create a `.env` file to put some secrets (and config options) inside.

## You're Done!
You may now run things like `npm start -- createRoles --dry`.
If you haven't worked with npm scripts in the past, you may be thinking: _Holy crap what are all of those `--`, well it's how we pass arguments to the script that `npm start` is executing. That's all.

### You're Curious?
`$ npm start -- --help`


#### Config
  - createRoles [Configuration Requirements]
    - Environment Variables
      - GOOGLE_SPREADSHEET_KEY
      - DISCORD_API_TOKEN
      - GOOGLE_DRIVE_CLIENT_EMAIL
      - GOOGLE_DRIVE_API_PRIVATE_KEY
