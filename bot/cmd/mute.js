const {Message, Client} = require("discord.js")

module.exports = {
    name:"mute",
    permission: "ADMINISTRATOR",
    usage: "[time]",
    description: "Mutes a certain member",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {string[]} args
    */
    execute: async (client, message, args) => {
        const role = message.guild.roles.cache.get(settings.muted_role)
        const memberArg = args.shift()
        const member = await getMember(message, [memberArg], true, false)
        if (!args[0]) {
            member.roles.add(role)
            client.muted.set(`${message.guild.id}.${member.id}`, {role})
            return message.channel.send(`Successfuly muted ${member.user.tag}.`)
        }
        let time = args.join(" ").toLowerCase().replace(/m+/g, "*60+").replace(/h+/g, "*60*60+").replace(/s+/g, "+").replace(/d+/g, "*60*60*24+").replace(/minutes/g, " * 60 + ").replace(/hours/g, "*60*60+").replace(/seconds/g, "+").replace(/days+/g, "*60*60*24+").replace(/minute+/g, "*60+").replace(/hour+/g, "*60*60+").replace(/second+/g, "+").replace(/day+/g, "*60*60*24+").slice(0, -1)
        let timeout;
        try {
            timeout = eval(`${eval(time) * 1 * 1000}`)
        } catch (e) {
            return message.channel.send("the time has to be a number or time literal, example: 2d3h1m50s")
        }
        if (isNaN(timeout)) return message.channel.send("the time has to be a number or time literal, example: 2d3h1m50s")
        let totalSeconds = (timeout / 1000);
        let days = Math.floor(totalSeconds / 86400);
        let hours = Math.floor((totalSeconds / 3600) % 24);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);
        if (seconds == 0) seconds = ""; else seconds = `${seconds} second/s and `
        if (days == 0) days = ""; else days = `${days} day/s and `
        if (hours == 0) hours = ""; else hours = `${hours} hour/s and `
        if (minutes == 0) minutes = ""; else minutes = `${minutes} minute/s and `
        let moment = `${days}${hours}${minutes}${seconds}`.slice(0, -4)
        client.muted.set(`${message.guild.id}.${member.id}`, {role, unmute: Date.now() + timeout})
        member.roles.add(role)
        message.channel.send(`Successfuly muted ${member.toString()} for ${moment}`)
        client.setTimeout(() => {
            client.muted.delete(`${message.guild.id}.${member.id}`)
            member.roles.remove(role)
        }, timeout)
    }
}