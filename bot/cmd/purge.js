const {Message, Client} = require("discord.js")

module.exports = {
    name:"purge",
    permission: "ADMINISTRATOR",
    usage: "<amount>",
    description: "Deletes a certain amount of messages in a channel.",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {string[]} args
    */
    execute: (client, message, args) => {
        if (!args[0]) return message.channel.send("You have to specify an amount to purge.")
        const amount = Math.floor(args[0])
        message.delete()
        message.channel.bulkDelete(amount)
        message.channel.send(`Successfuly purged ${amount} messages!`)
    }
}
