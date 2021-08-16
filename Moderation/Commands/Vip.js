const { MessageEmbed } = require('discord.js')
const moment = require('moment')
const ms = require('ms')
const Staff = require('../Models/Staffs')
const Penal = require('../Models/Penals')
moment.locale('tr')

module.exports = {
conf: {name: 'vip', aliases: ["özel-üye"], help: "!vip @Striga/ID "},
stg: async(client, message, args, config, embed, nembed, role, logs, perms, other) => {
if(!perms.OwnerPermissions.some(x => message.member.roles.cache.get(x)) && !perms.ManagerPermissions.some(x => message.member.roles.cache.get(x)) && !message.member.hasPermission('ADMINISTRATOR')) return 

const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!member) return message.channel.send(nembed.setDescription(`Bir üye belirtin ve tekrar deneyin.`))
if(member.id === message.author.id) return message.channel.send(nembed.setDescription(`Kendine VIP rolü veremezsin.`))
if(member.roles.cache.get(role.SuspectRole)) return message.channel.send(nembed.setDescription(`${member} adlı üye <@&${role.SuspectRole}> rolüne sahip olduğu için işlem yapılamamakta.`));
if(member.roles.cache.get(role.JailRole)) return message.channel.send(nembed.setDescription(`${member} adlı üye <@&${role.JailRole}> rolüne sahip olduğu için işlem yapılamamakta.`));
if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(nembed.setDescription(`Bu kullanıcı sizden üst/aynı pozisyonda.`));
if(!member.manageable) return message.channel.send(nembed.setDescription(`Bu kullanıcıya herhangi bir işlem uygulayamıyorum (yetkim aşağıda olabilir.)`))

if(member.roles.cache.get(role.VipRole)) {
member.roles.remove(role.VipRole)
message.channel.send(embed.setDescription(`${member} adlı üyeden <@&${role.VipRole}> rolü alındı.`))

client.channels.cache.get(logs.RolLog).send(embed.setDescription(`${member} üyesinden <@&${role.VipRole}> rolü alındı.

\`❯\` Kullanıcı ${member} (${member.id})
\`❯\` Yetkili: ${message.author} (${message.author.id}) 
\`❯\` Alınan Rol: <@&${role.VipRole}>
\`❯\` İşlem Kanalı: \`${message.channel.name}\` (<#${message.channel.id}>)
\`❯\` İşlem Tarihi: (${moment(+Date.now()).format("LLL")})`).setAuthor(message.guild.name, message.guild.iconURL({dynamic:true})).setColor('RANDOM'))
} else {
member.roles.add(role.VipRole)
message.channel.send(embed.setDescription(`${member} adlı üyeye <@&${role.VipRole}> rolü verildi.`))

client.channels.cache.get(logs.RolLog).send(embed.setDescription(`${member} üyesine <@&${role.VipRole}> rolü verildi.

\`❯\` Kullanıcı ${member} (${member.id})
\`❯\` Yetkili: ${message.author} (${message.author.id}) 
\`❯\` Verilen Rol: <@&${role.VipRole}>
\`❯\` İşlem Kanalı: \`${message.channel.name}\` (<#${message.channel.id}>)
\`❯\` İşlem Tarihi: (${moment(+Date.now()).format("LLL")})`).setAuthor(message.guild.name, message.guild.iconURL({dynamic:true})).setColor('RANDOM'))
}

}}