const rrSchema = require('./schemas/reaction_roles.js')

const cache = {} // { guildId: [message, { Emoji: RoleID }] }

const fetchCache = (guildId) => cache[guildId] || []

const addToCache = async (guildId, message, emoji, roleId) => {
  const array = cache[guildId] || [message, {}]

  if (emoji && roleId) {
    array[1][emoji] = roleId
  }

  await message.channel.messages.fetch(message.id, true, true)

  cache[guildId] = array
}

const handleReaction = async (reaction, user, adding) => {
  const { message } = reaction
  const { guild } = message

  let fetchedMessage = null;
  const res = await rrSchema.find({ guildId: message.guild.id, channelId: message.channel.id, messageId: message.id })
  if(res.length > 0){
    console.log('res')
      const res2 = res1.roles.find(x => x.emoji === reaction.emoji.id || x.emoji === reaction.emoji.name)
      if(res2){
        console.log('res2')
        const role = guild.roles.cache.get(res2.roleId)
        if (role) {
          const member = guild.members.cache.get(user.id)

          if (adding) {
            member.roles.add(role)
          } else {
            member.roles.remove(role)
          }
        }
      }
  }
}

const doIt = async (client) => {
   const results = await rrSchema.find()

  for (const result of results) {
    const { guildId, channelId, messageId, roles } = result

    const guild = await client.guilds.cache.get(guildId)

    if (!guild) {
      console.log(`Removing guild ID "${guildId}" from the database`)
      await rrSchema.deleteOne({ guildId })
      return
    }

    const channel = await guild.channels.cache.get(channelId)

    if (!channel) {
      console.log(`Removing channel ID "${channelId}" from the database`)
      await rrSchema.deleteOne({ channelId })
      return
    }

    try {
      const cacheMessage = true
      const skipCache = true
      const fetchedMessage = await channel.messages.fetch(
        messageId,
        cacheMessage,
        skipCache
      )

      if (fetchedMessage) {
        const newRoles = {}

        for (const role of roles) {
          const { emoji, roleId } = role
          newRoles[emoji] = roleId
        }

        cache[guildId] = [fetchedMessage, newRoles]
      }
    } catch (e) {
      console.log(`Removing message ID "${messageId}" from the database`)
      await rrSchema.deleteOne({ messageId })
    }
  }
}

module.exports.fetchCache = fetchCache
module.exports.addToCache = addToCache
module.exports.handleReaction = handleReaction
module.exports.doIt = doIt
