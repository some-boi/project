
const {Message, Client} = require("discord.js")
const getMember = require("./../classes/getMember.js")

module.exports = {
    name:"ban",
    permission: "ADMINISTRATOR",
    usage: "<member> [reason]",
    description: "Bans a certain member",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {string[]} args
    */
    execute: async (client, message, args) => {
        
        if (!args[0]) return message.channel.send("You have to specify a member.")
        const member = await getMember(message, args, true, false)
        if (!member.bannable) return message.channel.send("I can't ban that member.")
        let reason = !args[0] ? "No reason." : args.join(" ")
        member.ban({reason})
        message.channel.send(`Successfuly banned ${member.user.toString()} for "${reason}"`)
    }
}