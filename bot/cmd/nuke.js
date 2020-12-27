const {Message, Client} = require("discord.js")

module.exports = {
    name:"nuke",
    permission: "ADMINISTRATOR",
    description: "Deletes every possible message in a channel.",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {string[]} args
    */
    execute: async (client, message, args) => {
        const messages = await message.channel.messages.fetch()
        const amount = messages.size
        message.channel.bulkDelete(amount)
        message.channel.send(`Successfuly nuked the channel!`)
    }
}