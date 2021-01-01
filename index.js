const Discord = require('discord.js');
const config = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

["command", "events"].forEach(handler => 
{ // Command and Event handler
    require(`./handlers/${handler}`)(client);
});

client.login(config.Token)
