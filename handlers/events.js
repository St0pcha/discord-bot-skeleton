const { readdirSync } = require("fs");

module.exports = (client) => {

  const commands = readdirSync(`./events/`).filter(file => file.endsWith(".js"));
}