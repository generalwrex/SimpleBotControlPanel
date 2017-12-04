# SimpleBotControlPanel
A simple control panel to remote access NodeJS Discord Bots

**Currently Looking for collaborators that want to help, check issue [#1](https://github.com/generalwrex/SimpleBotControlPanel/issues/1)**

This uses NodeJS [Express](https://expressjs.com/) to serve and handle the control panels requests.

## Installation

```bash
  git clone https://github.com/generalwrex/SimpleBotControlPanel.git
  cd SimpleBotControlPanel
  npm install
```

## Testing

```bash
 node server.js
```

Navigate to http://localhost:3000

Put the path to your bot into the Bot Folder Path

![one](https://i.gyazo.com/17d5121ab347547ef007ad8add6b99ee.png)

Click start and your bot **should** run from it, watch the console!

Note: Dont forward the port in your router to access it somewhere outside of your network yet as it currently doesn't have any type of security
