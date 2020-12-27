const Discord = require("discord.js")
const fs = require("fs")
const db = require("quick.db")

const settings = require("../config.js")
const client = new Discord.Client()

client.muted = new db.table("muted")

client.commands = new Discord.Collection()
const commandFiles = fs.readdirSync(`./bot/cmd/`).filter(file => file.endsWith(".js"))
for (const file of commandFiles) {
    const command = require(`./cmd/${file}`)
    client.commands.set(command.name, command);
    console.log(`${file} loaded!`)
}

client.on("ready", () => {
    console.log("Successfuly logged it in as " + client.user.tag)
    client.setInterval(() => {
        for (let i in client.muted.all()) {
            const guildID = client.muted.all()[i].ID
            const guild = client.guilds.cache.find(e => e.id == guildID)
            const muteData = client.muted.all()[i].data
            for (let e in muteData) {
                const member = guild.members.cache.find(f => f.id == e)
                let role = guild.roles.cache.find(i => i.id == client.muted.get(`${guildID}.${member.id}.role`))
                if (!member) continue
                if (!client.muted.has(`${guildID}.${member.id}`)) continue
                if (!client.muted.has(`${guildID}.${member.id}.unmute`)) {
                    if (!member.roles.cache.find(i => i.id == client.muted.get(`${guildID}.${member.id}.role`))) member.roles.add(role)
                    continue
                }
                if (Date.now() >= client.muted.has(`${guildID}.${member.id}.unmute`)) {
                    if (member.roles.cache.find(i => i.id == role.id)) newMember.roles.remove(role)
                    return client.muted.delete(`${member.guild.id}.${member.id}`)
                } else {
                    if (!member.roles.cache.find(i => i.id == role.id)) member.roles.add(role)
                    client.setTimeout(() => {
                        client.muted.delete(`${member.guild.id}.${member.id}`)
                        member.roles.remove(role)
                    }, client.muted.get(`${member.guild.id}.${member.id}.unmute`) - Date.now())
                }
            }
        }
    }, 30000)
})

client.on("guildMemberAdd", member => {
    if (!client.muted.has(`${member.guild.id}.${member.id}`)) return
    const role = member.guild.roles.cache.find(e => e.id == client.muted.get(`${member.guild.id}.${member.id}.role`))
    if (!client.muted.has(`${member.guild.id}.${member.id}.unmute`)) return member.roles.add(role)
    if (Date.now() > client.muted.get(`${member.guild.id}.${member.id}.unmute`)) return client.muted.delete(`${member.guild.id}.${member.id}`)
    else {
        member.roles.add(role)
        client.setTimeout(() => {
            client.muted.delete(`${member.guild.id}.${member.id}`)
            member.roles.remove(role)
        }, client.muted.get(`${member.guild.id}.${member.id}.unmute`) - Date.now())
    }
})

client.on("guildMemberUpdate", (oldMember, newMember) => {
    if (oldMember.roles.cache.size < newMember.roles.cache.size) {
        if (!client.muted.has(`${newMember.guild.id}.${newMember.id}`)) return
        const role = newMember.guild.roles.cache.find(e => e.id == client.muted.get(`${newMember.guild.id}.${newMember.id}.role`))

        if (!client.muted.has(`${newMember.guild.id}.${newMember.id}.unmute`) && !newMember.roles.cache.find(e => e.id == role.id)) return newMember.roles.add(role)
        if (Date.now() >= client.muted.get(`${newMember.guild.id}.${newMember.id}.unmute`)) {
            if (newMember.roles.cache.find(e => e.id == role.id)) newMember.roles.remove(role)
            return client.muted.delete(`${newMember.guild.id}.${newMember.id}`)
        }
        else {
            if (!newMember.roles.cache.find(e => e.id == role.id)) newMember.roles.add(role)
            client.setTimeout(() => {
                client.muted.delete(`${newMember.guild.id}.${newMember.id}`)
                if (newMember.roles.cache.find(e => e.id == role.id)) newMember.roles.remove(role)
            }, client.muted.get(`${newMember.guild.id}.${newMember.id}.unmute`) - Date.now())
        }
    } else return
})

client.on("message", message => {
    let prefix = settings.prefix
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
    if (!command) return;
    if (command.permission && !message.member.hasPermission(command.permission)) return message.channel.send("You do not have enough permissions to use this command.")
    if (message.channel.type == "dm") return
    try {
        command.execute(client, message, args)
    } catch (e) {
        console.error(e)
    }
})

module.exports.init = async (token) => {
    //client.userBaseDirectory = __dirname;
    await client.login(token);
    return client;
}