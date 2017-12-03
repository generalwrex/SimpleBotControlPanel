# SimpleBotControlPanel
A simple control panel to remote access NodeJS Discord Bots

**Currently Looking for collaborators that want to help, check issue [#1](https://github.com/generalwrex/SimpleBotControlPanel/issues/1)**


Currently the control panel uses [Forever](https://github.com/foreverjs/forever) to handle controlling the bot,
and NodeJS [Express](https://expressjs.com/) to serve and handle the control panels requests.

This may be paired with a DBM Actions and Events to allow the control panel to communicate with the bot that its controlling for advanced features in the future.

# Testing

If you want to test it, download the repository, extract into a folder somewhere, 

If on windows can run it with the provided start_bot.bat, otherwise 

    node botcp.js
    

Navigate to http://localhost:3000

Put the path to your bot into the Bot Folder Path

![one](https://i.gyazo.com/17d5121ab347547ef007ad8add6b99ee.png)

Click start and your bot **should** run from it, watch the console!

Try to access it from another device on your network ( like a smartphone ) by putting your machine's local ip address in place of localhost (i.e. http://[machineip]:3000 )

To find the machine ip (on windows), type **cmd** into the search bar, type **ipconfig** and hit enter, your machine ip should be the first one marked **Ethernet** next to **Ipv4 Address** then type that into your other device as http://[machineip]:3000 

on linux run **ifconfig** and normally the one marked with **eth0** is your primary connection and your machine ip is next to
**inet addr**


Note: Dont forward the port in your router to access it somewhere outside of your network yet as it currently doesn't have any type of security
