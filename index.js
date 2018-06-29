const tmi = require('tmi.js');
const options = require('./options');




//Connect to twitch server
const client = new tmi.client(options);

client.connect();
