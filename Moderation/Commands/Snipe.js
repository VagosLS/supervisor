const { MessageEmbed } = require('discord.js')
const moment = require('moment')
const Snipe = require('../Models/Snipe')

module.exports = {
conf: {name: 'snipe', aliases: ["sp", "ensonmesaj"], help: "!snipe"},
stg: async(client, message, args, config, embed, nembed, role, logs, perms, other) => {
if(!perms.OwnerPermissions.some(x => message.member.roles.cache.get(x)) && !perms.ManagerPermissions.some(x => message.member.roles.cache.get(x)) && !perms.AllPenalsPermissions.some(x => message.member.roles.cache.get(x)) && !message.member.hasPermission('ADMINISTRATOR')) return 

let SnipeMessage = await Snipe.findOne({ GuildID: message.guild.id })
if(!SnipeMessage) return message.channel.send(nembed.setDescription(`Silinen bir mesaj bulamadım.`))
message.channel.send(embed.setDescription(` 
\`Kullanıcı:\` <@${SnipeMessage.UserID}>
\`Kanal:\` <#${SnipeMessage.ChannelID}>
\`Atılan Tarih:\` ${moment(+SnipeMessage.createdDate).format("LLL")}
\`Silinen Tarih:\` ${moment(+SnipeMessage.deletedDate).format("LLL")}

Atılan Mesaj:
\`\`\`${SnipeMessage.messageContent}\`\`\`
`))

}}