const {notFound, invalidSyntax} = require("./errors")
const Discord = require("discord.js")


/**
 * @type {Discord.GuildMember}
 * @param {Discord.Message} message 
 * @param {string[]} args 
 * @param {boolean} bot 
 * @param {boolean} author 
 */
module.exports = async (message, args, bot=true, author=true) => {
  if(!args[0]) {
    if (author) return message.member; else return null
  }
  let user = message.mentions.members.first()
  if(!user) {
    if(!isNaN(args.join(" "))) {
      user = message.guild.members.cache.get(args.join(" "))
      if(!user) { 
        if(author) return message.member
        notFound(message); return null 
      }
    } else {
      if(bot) user = message.guild.members.cache.filter(m => m.user.username.toLowerCase().includes(args.join(" ").toLowerCase())).map(m => m)
      else user = message.guild.members.cache.filter(m => m.user.username.toLowerCase().includes(args.join(" ").toLowerCase()) && !m.user.bot).map(m => m)
      if(!user) { 
        if(author) return message.member
        notFound(message); return null 
      } 
      else if (user.length < 1) { notFound(message); return null}
      else if(user.length == 1) user = user[0]
      else if(user.length > 10) { message.channel.send("Too many users found in this server. Please search more detail"); return null}
      else {
        let arr = []
        const e = new Discord.MessageEmbed()
        let content = ""
        let i = 1
        for(const u of user) {
          arr.push({n: i, id: u.user.id}) // 
          content += `\`${i}\` - **${u.user.tag}**\n\n`
          i++
        }
        if((arr) < 1) { 
          if(author) return message.member
          notFound(message); return null 
        }
      e.setDescription("Please type a number in below which member should I choose\n\n" + content)
      .setFooter("Type any numbers in channel to pick a member")
      .setColor("RANDOM")
      const sent = await message.channel.send(e)
        const f = await message.channel.awaitMessages(m => !isNaN(m.content) && m.author.id == message.author.id, {max: 1, time: 15 * 1000, errors: ["time"]}).catch(f => message.channel.send("Hmmm... seems like you're inactive"))
        const c = f.first().content// bruh
        const oo = arr.find(m => m.n == c)
        if(!oo) { 
          if(author) return message.member
          invalidSyntax(message, "type correct number above"); return null 
        }
          if(isNaN(c)) { 
            invalidSyntax(message, "type any number in chat"); return null 
          }
          else {
            if((c) > arr.length || (c) < 1) { invalidSyntax(message, "type the correct number above"); return null }
            else user = message.guild.members.cache.find(e => e.id == arr.find(m => m.n == c).id) 
            
        }
      await sent.delete()
      }                            
    }
  }
  return user
}