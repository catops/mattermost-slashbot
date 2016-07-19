# mattermost-slashbot [![Build Status](https://img.shields.io/travis/catops/mattermost-slashbot.svg?maxAge=2592000&style=flat-square)](https://travis-ci.org/catops/mattermost-slashbot) [![npm](https://img.shields.io/npm/v/mattermost-slashbot.svg?maxAge=2592000&style=flat-square)](https://www.npmjs.com/package/mattermost-slashbot)

:cat: A Hubot script that parses slash commands from Mattermost, forwards them to the bot, then formats the bot response to be slash command friendly.

See [`src/mattermost-slashbot.js`](src/mattermost-slashbot.js) for full documentation.

## Installation

In hubot project repo, run:

`npm install mattermost-slashbot --save`

Then add **mattermost-slashbot** to your `external-scripts.json`:

```json
["mattermost-slashbot"]
```

## Sample Interaction

**Setup webhook that posts to /hubot/command/**

User types:
```
/bot ping
```

Everyone sees:
```
User [BOT]: PONG
```

## Contributing

Please read our general [contributing guidelines](CONTRIBUTING.md).

## Open source licensing info
1. [TERMS](TERMS.md)
2. [LICENSE](LICENSE)
3. [CFPB Source Code Policy](https://github.com/cfpb/source-code-policy/)
