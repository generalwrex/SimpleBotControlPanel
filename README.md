# SimpleBotControlPanel
A simple control panel to remote access Discord Bot Maker Bots

As this is part of the ever expanding DBM Mods lineup, I'm adding in the DBM Mods patreon if anyone would like to pledge ;)

![DBM](https://c10.patreonusercontent.com/3/eyJ3Ijo0MDB9/patreon-media/user/8699698/ba1ff3c810d74077a1f42b198d7f74b6?token-time=2145916800&amp;token-hash=uFFE1cKyDbPqZiP55WxRRSoibtBApY1n4uv7z_c-Kg0%3D)

https://www.patreon.com/dbmmods

**Currently Looking for collaborators that want to help, check issue [#1](https://github.com/generalwrex/SimpleBotControlPanel/issues/1)**

 ## this branch does not currently start the bot.

This uses NodeJS [Express](https://expressjs.com/), SocketIO for cross communication, and the Pug view engine

## Installation

```bash
  git clone https://github.com/generalwrex/SimpleBotControlPanel.git
  cd SimpleBotControlPanel
  npm install
```

## Developing
This will start the bot nodemon (refreshes the server on file changes)

```bash
 nodemon app
```

## Testing

```bash
 node ./bin/www
```


Navigate to http://localhost:3000/login (or http://[machineip]:3000/login)
Username: admin
password: admin

![login](https://i.gyazo.com/ed7f636b55d104008c69fb8fe6c9a72d.png)


Logging in connects you to the server via SocketIO, Clicking the Start Bot button currently fires off the event handler testing function

Note: Dont forward the port in your router to access it somewhere outside of your network yet as it currently doesn't have any type of security
