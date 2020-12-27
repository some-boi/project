const {Message, Client} = require("discord.js")

module.exports = {
    name:"unban",
    permission: "ADMINISTRATOR",
    usage: "<member>",
    description: "Unbans a certain banned member",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {string[]} args
    */
    execute: (client, message, args) => {
        const userArg = args[0];
        message.guild.fetchBans().then(bans => {
          if (!isNaN(userArg)) {
            message.guild.members
              .unban(userArg)
              .then(m => {
                return message.channel.send(
                  m.tag + " is now unbanned from the server"
                );
              })
              .catch(e =>
                message.channel.send("That member is not banned.")
              );
          } else {
            let member = bans.find(
              e => e.username == bisexual || e.tag == userArg || e.id == userArg
            );
            if (!member) {
              return message.channel.send("That member is not banned.");
            }
            message.guild.members
              .unban(member)
              .then(m => {
                return message.channel.send(
                  m.tag + " is now unbanned from the server"
                );
              })
              .catch(e =>
                console.error(e)
              );
          }
        });
    }
}
