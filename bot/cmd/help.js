const {Message, Client, MessageEmbed} = require("discord.js")
const settings = require("./../../config.js")

module.exports = {
    name:"help",
    usage: "[command]",
    description: "Shows available commands / Shows information about a command",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {string[]} args
    */
    execute: async (client, message, args) => {
        if (args[0]) {
            const command = client.commands.get(args[0])
            if (!command) return message.channel.send("That's not an available command")
            const name = command.name
            const usage = command.usage
            const permission = command.permission
            const description = command.description
            const embed = new MessageEmbed()
                .setTitle(name + " information:")
                .setDescription(description)
                .addField("Command usage:", `
[] is for optional arguments
<> is for needed arguments
\`\`${settings.prefix + name} ${!usage ? "" : usage}\`\`
                `, false)
                .addField("Permissions needed:", `\`\`${permission.toLowerCase().replace(/_/g, " ").replace(/guild/g, "server")}\`\``, false)
                .setTimestamp()
                .setColor("BLUE")
            return message.channel.send(embed)
        }
        const commands = client.commands.map(e => `\`\`${e.name}\`\`\n${e.description}`).join("\n\n")
        const embed = new MessageEmbed()
            .setTitle("Current available commands:")
            .setDescription(commands)
            .setColor("BLUE")
            .setTimestamp()
        message.channel.send(embed)
    }
}