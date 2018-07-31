# lunaebot
A nodejs twitchbot made by Aureus Lunae.

# Installation
This bot use nodejs. We recommend you to install this first. You can download it here: https://nodejs.org/en/

After installing, download the bot.

In the bot folder, open the terminal/command prompt and type the following:
npm i tmi.js --save
Wait till it is finished, then type the following to make the databases work:
npm install sqlite3

# Configuration
Open config.js (notepad works, but notepad++ is highly recommended).

Make a twitch account for your bot and then get an oauth code for your bot account. (https://twitchapps.com/tmi/)
Note: Must log in with bot account on that site to get the password for your bot.

Change the following lines to your bot account:

identity: {
			username: 'bot twitch account',
			password: 'oauth:'
	},
  
For example:
identity: {
			username: 'Lunaebot',
			password: 'oauth:samplekey98177'
	},

# Starting the bot
After that you can use start.bat to start the bot. Or you open the Terminal in the bot folder and type: 
npm start

