const { MessageEmbed } = require('discord.js')
const moment = require('moment')
const ms = require('ms')
const Staff = require('../Models/Staffs')
const Penal = require('../Models/Penals')
moment.locale('tr')
module.exports = {
conf: {name: 'kilit', aliases: ["kanal-kilit", "kitle"], help: "!kilit"},
stg: async(client, message, args, config, embed, nembed, role, logs, perms, other) => {
if(!perms.OwnerPermissions.some(x => message.member.roles.cache.get(x)) && !message.member.hasPermission('ADMINISTRATOR')) return 

let everyone = message.guild.roles.cache.find(x => x.name === `@everyone`);
if(message.channel.permissionsFor(everyone).has("SEND_MESSAGES")) {
message.channel.updateOverwrite(everyone, {SEND_MESSAGES: false});
message.channel.send(embed.setAuthor(message.guild.name, message.guild.iconURL({dynamic:true})).setDescription("Kanal kilitlendi 🔒").setColor('BLACK')).then(message.react(`🔒`))
} else {
message.channel.updateOverwrite(everyone, {SEND_MESSAGES: null});
message.channel.send(embed.setAuthor(message.guild.name, message.guild.iconURL({dynamic:true})).setDescription("Kanal kilidi açıldı 🔓").setColor('BLACK')).then(message.react(`🔓`))}

}}