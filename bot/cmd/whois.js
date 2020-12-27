const {Message, Client} = require("discord.js")
const Discord = require("discord.js")
const getMember = require("../classes/getMember")
const moment = require("moment")

module.exports = {
	name:"whois",
	description:"Get information about a member",
	usage:"[member]",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {string[]} args
    */
	execute: async (client, message, args) => {
		getMember(message, args, true, true).then(
			/**
			 * @param {Discord.GuildMember} member 
			 */
			async (member) => {
			if (!member) return
			if (member.partial) member.fetch()
			if (member.user.partial) member.user.fetch()
			const from = (Date.now() - member.user.createdTimestamp)/1000/60/60/24
			const date = moment(member.user.createdAt).format("ddd DD/MM/YYYY LTS")
			const tag = member.user.tag
			const displayed= member.displayName
			const bot = member.user.bot ? "this member is a bot" : "this member is not a bot"
			let smth = member.user.presence.activities[0]
			let activity;
			if (smth) {
				switch (smth.type) {
					case "CUSTOM_STATUS":
						activity = smth.state
						break
					default:
						activity = smth.name
						break
				}
			} else activity = "None"
			const amounts = member.roles.cache.size
			const joinedf = (Date.now() - member.joinedTimestamp)/1000/60/60/24
			const idfk = moment(member.joinedAt).format("ddd DD/MM/YYYY LTS")
			const color = member.displayHexColor
			const highest = member.roles.highest.mentionable ? "<@&" + member.roles.highest.id + ">" : member.roles.highest.name
			const embed = new Discord.MessageEmbed().setTitle(tag + "'s user info:")
			.addField("member tag:", tag)
			.addField("displayed name on the server:", displayed)
			.addField("displayed color hex:", color)
			.addField("is this member a bot:", bot)
			.addField("this member's status:", activity)
			.addField("member created at:", date + " (" + from.toFixed(0) + " days)")
			.addField("member joined at:", idfk + " (" + joinedf.toFixed(0) + " days)")
			.addField("amount of roles:", "this member has " + amounts + " roles")
			.addField("highest role:", highest)
			.setColor(member.displayColor)
			.setThumbnail(member.user.displayAvatarURL({dynamic: true}))
			.setTimestamp()
			message.channel.send(embed)
		})
	}
}