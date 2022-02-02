const color = 'E01120';
const fs = require('fs');
const path = require('path');
const mongo = require('./mongo.js');
const DiscordJS = require('discord.js');
const settingsSchema = require('./schemas/server_settings-schema.js');
const prefixSchema = require('./schemas/prefix-schema.js')
const commandSchema = require('./schemas/command-schema.js')

module.exports.findPrefixes = async function(guildId){
  let res = [];
    try {
      res = await prefixSchema.find(
        {
          guildId: guildId,
        },
      ).lean()
    } finally {
      res.push({prefix: 't.'})
  }
  return res;
}

module.exports.cmdInfo = async function(guildId, command) {
  let res;
    try {
      res = await commandSchema.findOne(
        {
          guildId: guildId,
				  command: command,
        },
      ).lean()
    } finally {
  }
  return res;
}

module.exports.embed = function (title, desc){
  var output = {
    title: title,
    description: desc,
    color: '0x' + color,
  }
    /*var output = new DiscordJS.MessageEmbed().setTitle(title)
    output.setDescription(desc)
    output.setColor('0x2471a3')*/
    return output
}

module.exports.embedre = function (message, title, desc){
  var output = {
    title: title,
    description: desc,
    color: '0x' + color,
  }
    /*var output = new DiscordJS.MessageEmbed().setTitle(title)
    output.setDescription(desc)
    output.setColor('0x2471a3')*/
    //return output
    message.channel.send({embeds: [output]});
}

module.exports.sendEmbed = function (message, title, desc) {
  var output = new DiscordJS.MessageEmbed().setTitle(title).setDescription(desc).setColor('0x' + color);
  message.channel.send({embeds: [output]})
}

module.exports.sendSlashEmbed = async function (interaction, title, desc, ephemeral) {
  var output = new DiscordJS.MessageEmbed().setTitle(title).setDescription(desc).setColor('0x' + color);
  await interaction.reply({embeds: [output], ephemeral: ephemeral});
}

module.exports.editReplyWithSlashEmbed = async function (interaction, title, desc, ephemeral) {
  var output = new DiscordJS.MessageEmbed().setTitle(title).setDescription(desc).setColor('0x' + color);
  await interaction.editReply({content: '', embeds: [output], components: []});
}

module.exports.updateWithSlashEmbed = async function (interaction, title, desc, ephemeral) {
  var output = new DiscordJS.MessageEmbed().setTitle(title).setDescription(desc).setColor('0x' + color);
  await interaction.update({embeds: [output], components: []});
}

module.exports.colorembed = function (title, desc, hex){
    var output = new DiscordJS.MessageEmbed().setTitle(title)
    output.setDescription(desc)
    output.setColor(hex)
    return output
}

module.exports.extembed = function (title, desc, thumbnail, footer){
    var output = new DiscordJS.MessageEmbed().setTitle(title)
    output.setDescription(desc)
    output.setThumbnail(thumbnail)
    output.setFooter(footer)
    output.setColor('0x2471a3')
    return output
}

module.exports.imgembed = function (title, desc, img){
    var output = new DiscordJS.MessageEmbed().setTitle(title)
    output.setDescription(desc)
    output.setImage(img)
    output.setColor('0x2471a3')
    return output
}

module.exports.authembed = function (title, desc, name, url){
    var output = new DiscordJS.MessageEmbed().setTitle(title)
    output.setDescription(desc)
    output.setAuthor(name, url)
    output.setColor('0x2471a3')
    return output
}

module.exports.error = function (error){
    var output = new DiscordJS.MessageEmbed().setTitle("Command Error:");
    output.setDescription(error);
    output.setColor('0x2471a3');
    output.setFooter({text:'Join our support server! <Private until further notice>'})
    return output
}

module.exports.invarg = function (reqarg){
    var output = new DiscordJS.MessageEmbed().setTitle("Invalid Usage:")
    output.setDescription("Intended Usage `" + reqarg + "`")
    output.setColor('0x2471a3')
    output.setFooter('Join our support server! https://discord.gg/MUNgGD5mp7')
    return output
}

module.exports.cmd = function(msg, client){
  let cmd = "";
  let args = "null"
  if(msg.content.split(' ')!=null){
    cmd=msg.content.split(' ')[0]
    let temp=msg.content.split(' ')
    temp.shift()
    args==temp.join(' ')
  }
  else{
    cmd = msg.content;
  }
  let guildName = msg.guild!=null?msg.guild.name:msg.author.tag;
  let guildId = msg.guild!=null?msg.guild.name:'DMs';
  let channelId = msg.guild!=null?msg.channel.id:'DMs';
  client.channels.cache.get('848581467117453333').send({ embeds: [client.functions.embed(`${cmd} used in ${guildName}`, "Message: `" + msg.content + "`\nCommand: `" + cmd + "`\nArguments: `" + args + "`\nUser ID: `" + msg.author.id + '`\nChannel ID: `' + channelId + '`\nServer ID: `' + guildId + '`')] })
}

module.exports.erry = function(err, msg, client){
  try{
  let cmd = "";
  let args = "null"
  let content = msg.content.trim().length>0?msg.content:" ";
  if(msg.content.split(' ')!=null){
    cmd=msg.content.split(' ')[0]
    let temp=msg.content.split(' ')
    temp.shift()
    args==temp.join(' ')
  }
  else{
    cmd = msg.content;
  }
  let guildName = msg.guild!=null?msg.guild.name:msg.author.tag
  let guildId = msg.guild!=null?msg.guild.name:'DMs'
  let channelId = msg.guild!=null?msg.channel.id:'DMs'
  client.channels.cache.get('848581467117453334').send({embeds: [client.functions.embed(`Error in ${guildName}`, "Message: `" + content + "`\nCommand: `" + cmd + "`\nArguments: `" + args + "`\nError: `" + err + "`\nUser ID: `" + msg.author.id + '`\nChannel ID: `' + channelId + '`\nServer ID: `' + guildId + '`')]})
  } catch(erry){
    console.log(err)
  }
}

module.exports.isNumeric = function(value) {
    return /^\d+$/.test(value);
}

module.exports.isImgLink = function(url) {
    if(typeof url !== 'string') return false;
    return(url.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gmi) != null);
}

module.exports.isInteger = function(value) {
    return /^-?\d+$/.test(value);
}

module.exports.isColor = function(value) {
    return /^#([A-Fa-f0-9]{6})$/.test(value);
}

/*module.exports.staffCheck = async function(client, message){
  const result = await settingsSchema.findOne({ guildId: message.guild.id })
  if(result!=null && result.staffrole!=null && !message.member.roles.cache.find(r => r.id === result.staffrole)){
    message.channel.send(client.functions.error(`Missing Roles: <@&${message.guild.roles.cache.find(r => r.id === result.staffrole).id}>`))
    return false;
  } else if(result == null || result.staffrole==null){
    message.channel.send(client.functions.error(`Staff role hasn't been setup!\n Please setup Staff role by using ` + "`" + '!staff role <role-id>' + "`"))
    return false;
  }
}*/

module.exports.disabledCheck = async function(client, message){
  const result = await commandSchema.findOne({ guildId: message.guild.id })
  if(result!=null && !result.disabled.includes(message.content.split(' ')[0])){
    return false;
  }
}

module.exports.channelCheck = async function(client, message){
  const result = await commandSchema.findOne({ guildId: message.guild.id })
  if(result!=null && !result.channelsrestrict.find(x => x.cmd==message.content.split(' ')[0] && x.id != message.channel.id)){
    return false;
  }
}

/*module.exports.premiumCheck = async function(client, message){
  const emoji = client.emojis.cache.get('840823062076063747')
  const result = await settingsSchema.findOne({ guildId: message.guild.id })
  if(result.premium==null || result.premium!=null && result.premium==false){
    message.channel.send(client.functions.premiumEmbed(client))
    return false;
  }
}*/

module.exports.premiumEmbed = function(client){
  const emoji = client.emojis.cache.get('848912392477212712')
  return client.functions.embed("Uh oh, seems this server doesn't have Brianna Premium!", `__Subscribe to Brianna Premium, get amazing perks!__\n\n${emoji}  Unlimited Level Rewards\n${emoji}  Brianna Music Unleashed`);
}

module.exports.loading = function(client) {
  const temp = new DiscordJS.MessageEmbed().setDescription(`${client.emojis.cache.get('848911516158001213')}` + " Loading....").setColor("0x2471a3")
  return temp;
}
