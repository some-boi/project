const {Message, Client} = require("discord.js")

module.exports = {
    name:"mute",
    permission: "ADMINISTRATOR",
    usage: "<member>",
    description: "Unmutes a certain member",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {string[]} args
    */
    execute: async (client, message, args) => {
        if (!args[0]) return message.channel.send("You have to specify a member.")
        const role1 = message.guild.roles.cache.get(settings.muted_role)
        const member = await getMember(message, args, true, false)
        if (!client.muted.has(`${message.guild.id}.${member.id}`)) {
            if (!member.roles.cache.find(e => e.id == role1.id)) return message.channel.send("That member is not muted.")
            member.roles.remove(role1)
        }
        const role2 = message.guild.roles.cache.get(client.muted.get(`${message.guild.id}.${member.id}.role`))
        client.muted.delete(`${message.guild.id}.${member.id}`)
        member.roles.remove(role2)
        message.channel.send("Member muted successfuly.")
    }
}