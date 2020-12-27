
module.exports = {
  notFound: (message, type="user") => {
    return message.channel.send(`It looks like that ${type} is not found`)
  },
  invalidSyntax: (message, type) => {
    return message.channel.send(`Invalid syntax, you should \`${type}\``)
  }
}