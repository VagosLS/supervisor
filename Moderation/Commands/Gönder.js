const { MessageEmbed } = require('discord.js')
const moment = require('moment')
const ms = require('ms')
const Staff = require('../Models/Staffs')
const Penal = require('../Models/Penals')
moment.locale('tr')
module.exports = {
conf: {name: 'gönder', aliases: ["gönder"], help: "!gönder @Striga/ID kanalID"},
stg: async(client, message, args, config, embed, nembed, role, logs, perms, other) => {
if(!perms.OwnerPermissions.some(x => message.member.roles.cache.get(x)) && !message.member.roles.cache.get(perms.BotCommands) && !perms.ManagerPermissions.some(x => message.member.roles.cache.get(x)) && !message.member.hasPermission('ADMINISTRATOR')) return 

const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!member) return message.channel.send(nembed.setDescription(`Bir üye belirtin ve tekrar deneyin.`))
if(!member.voice.channel) return message.channel.send(nembed.setDescription(`Göndermek istediğin kullanıcı ses kanalında değil.`))
let kanal = message.guild.channels.cache.find(x => x.id == args[1])
if(!kanal) return message.channel.send(nembed.setDescription(`Göndermek istediğin kanalı ID ile belirtin.`))
if(!kanal.permissionsFor(member).has("CONNECT")) return message.channel.send(nembed.setDescription(`Kanala taşımak istediğin üyenin kanala bağlanma yetkisi bulunmuyor.`))
member.voice.setChannel(kanal.id);
message.channel.send(embed.setDescription(`${member} başarıyla ${kanal.name} kanalına gönderildi.`))
}}
