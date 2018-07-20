const options = {
	options: {
    debug: true
	},
	connection: {
		reconnect: true
	},
	identity: {
			username: 'bot twitch account',
			password: 'oauth:'
	},
	channels: [
		'#channelname'
	]
}

module.exports = options;
