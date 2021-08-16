const { MessageEmbed } = require('discord.js')
const moment = require('moment')
const ms = require('ms')
const Staff = require('../Models/Staffs')
const Penal = require('../Models/Penals')
const Counter = require('../Models/Counters')

module.exports = {
conf: {name: 'cezapuanı', aliases: ["cp", "ceza-puanı", "cezapuan", "ceza-puan"], help: "!cezapuanı @Striga/ID"},
stg: async(client, message, args, config, embed, nembed, role, logs, perms, other, points) => {
if(!message.member.roles.cache.get(perms.MutePermissions) && !perms.OwnerPermissions.some(x => message.member.roles.cache.get(x)) && !perms.ManagerPermissions.some(x => message.member.roles.cache.get(x)) && !perms.AllPenalsPermissions.some(x => message.member.roles.cache.get(x)) && !message.member.hasPermission('ADMINISTRATOR')) return 

const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!member) return message.channel.send(nembed.setDescription(`Bir üye belirtin ve tekrar deneyin.`))
Counter.findOne({UserID: member.id, GuildID: message.guild.id}, async(err, data) => {
if(!data) return message.channel.send(nembed.setDescription(`${member} adlı üyenin cezası olmadığı için bir ceza puanıda bulunmuyor.`))
message.channel.send(embed.setDescription(`${member} toplamda \`${data.PenalPoint}\` ceza puanı bulunmaktadır.`))

}) 

}}
