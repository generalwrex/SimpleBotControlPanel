# SimpleBotControlPanel
A simple control panel to remote access Discord Bot Maker Bots

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
