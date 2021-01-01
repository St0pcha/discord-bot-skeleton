const db = require("quick.db")
const config = require("../config.json");
const { MessageEmbed } = require("discord.js");
let cooldown = {}

module.exports.run = async (client, message) =>
{
  if (message.author.bot) return;
  if (!message.guild) return;

  if (!message.member.hasPermission("ADMINISTRATOR")) {

    message.content.split(" ").forEach(m =>
    {
      if (is_url(m)) {
        message.delete().catch(err => {})
        return message.channel.send("Links is disabled :/")
        

      } else if (config.BadWords.find(x => x.toLowerCase() === m.toLowerCase()))
      {
        message.delete().catch(err => {})
        return message.channel.send("Badwords is disabled!")

      }
    })
  }

  let prefix = db.get(`prefix_${message.guild.id}`);
  if (prefix === null) prefix = config.DefPrefix;

  if (!message.content.startsWith(prefix)) return;

  if (!message.member)
    message.member = await message.guild.members.fetch(message);

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));

  if (!command) return;
  if (command) command.run(client, message, args);
 
}

function is_url(str)
{
  let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  
  if(regexp.test(str))
  {
    return true;
  } else {
    return false;
  }
}
  
}
