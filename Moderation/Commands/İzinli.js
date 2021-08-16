const { MessageEmbed } = require('discord.js')
const moment = require('moment')
const ms = require('ms')
const Staff = require('../Models/Staffs')
const Penal = require('../Models/Penals')
const Extra = require('../Models/Extra')

module.exports = {
conf: {name: 'izinli', aliases: ["izin-ver"], help: "!izinli @Striga/ID sebep"},
stg: async(client, message, args, config, embed, nembed, role, logs, perms, other) => {
if(!perms.OwnerPermissions.some(x => message.member.roles.cache.get(x)) && !perms.ManagerPermissions.some(x => message.member.roles.cache.get(x)) && !message.member.hasPermission('ADMINISTRATOR')) return 

const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!member) return message.channel.send(nembed.setDescription(`Bir üye belirtin ve tekrar deneyin.`))
if(member.roles.cache.get(role.İzinliRole)) {
message.channel.send(embed.setDescription(`${member} adlı üyeden <@&${role.İzinliRole}> rolü alındı. Artık kullanıcı izinli değil ve toplantılara katılımı zorunlu.`))
member.roles.remove(role.İzinliRole)
} else {
message.channel.send(embed.setDescription(`${member} adlı üyeye <@&${role.İzinliRole}> rolü verildi.\nUmarım en kısa zamanda tekrardan toplantılara katılırsın.`))
member.roles.add(role.İzinliRole)
}
}}
