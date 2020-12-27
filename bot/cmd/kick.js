const {Message, Client} = require("discord.js")

module.exports = {
    name:"kick",
    permission: "ADMINISTRATOR",
    usage: "<member> [reason]",
    description: "Kicks a certain member",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {string[]} args
    */
    execute: async (client, message, args) => {
        if (!args[0]) return message.channel.send("You have to specify a member.")
        const member = await getMember(message, args, true, false)
        if (!member.kickable) return message.channel.send("I can't kick that member.")
        let reason = !args[0] ? "No reason." : args.join(" ")
        member.kick({reason})
        message.channel.send(`Successfuly kicked ${member.user.toString()} for "${reason}"`)
    }
}