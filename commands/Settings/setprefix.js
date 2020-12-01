const db = require("quick.db")
const discord = require('discord.js');

module.exports = {
  name: "prefix",
  category: "Settings",
  usage: "prefix <New Prefix>",
  description: "Change the prefix",
  run: async (client, message, args) => {

    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`You don't have perms!`)

    if(!args[0]) return message.channel.send(`${message.author.username}, You doesn't type new prefix!`)

    if(args[1]) return message.channel.send(`${message.author.username}, You don't can use more than 1 arguments!`)
    
    if(args[0].length > 3) return message.channel.send(`${message.author.username}, You don't can have prefix more than 3 symbols!`)
    
    db.set(`prefix_${message.guild.id}`, args[0])
    let newprefix = new discord.MessageEmbed()
    .setDescription(`${message.author.username}, new prefix is ${args[0]}!`)
    .setColor("RANDOM")
    message.channel.send(newprefix)
    
  }
}