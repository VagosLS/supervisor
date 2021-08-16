const { MessageEmbed } = require('discord.js')
const moment = require('moment')
moment.locale('tr')
module.exports = {
conf: {name: 'rol', aliases: ["role"], help: "!rol @Striga/ID ver/al @Rol/ID"},
stg: async(client, message, args, config, embed, nembed, role, logs, perms, other) => {
if(!perms.OwnerPermissions.some(x => message.member.roles.cache.get(x)) && !message.member.hasPermission('ADMINISTRATOR')) return 

const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
let belirt = args[1]

if(!member) return message.channel.send(nembed.setDescription(`Bir üye belirtin ve tekrar deneyin.`))
if(!belirt) return message.channel.send(nembed.setDescription(`Rol vermelimiyim almalımıyım ? \n\`!rol @Striga/ID ver/al @Rol/ID\``))

if(belirt === "ver" || belirt === "add") {
let mentionsrol = args[2]
if(!mentionsrol) return message.channel.send(nembed.setDescription(`Bir rol belirt.`))
if(member.roles.cache.get(mentionsrol)) return message.channel.send(nembed.setDescription(`${member} daha önceden <@&${mentionsrol}> rolü verilmiş.`))    
message.channel.send(embed.setDescription(`${member} üyesine <@&${mentionsrol}> rolü verildi.`))
member.roles.add(mentionsrol)

client.channels.cache.get(logs.RolLog).send(embed.setDescription(`
${member} adlı üyeye <@&${mentionsrol}> rolü **verildi** ! ${other.Onayla} 

━━━━━━━━━━━━━━━━━
\`❯\` Kullanıcı: ${member} | \`${member.id}\`
\`❯\` Yetkili: ${message.author} | \`${message.author.id}\`
\`❯\` Verilen Rol: <@&${mentionsrol}> 
\`❯\` Kanal: **\`${message.channel.name}\`** (<#${message.channel.id}>)
━━━━━━━━━━━━━━━━━
\`❯\` Tarih: ${moment(+Date.now()).format("LLL")}
`).setColor('#67cf9f'))
}

if(belirt === "al" || belirt === "remove") {
let mentionsrol = args[2]
if(!mentionsrol) return message.channel.send(nembed.setDescription(`Bir rol belirt.`))
if(!member.roles.cache.get(mentionsrol)) return message.channel.send(nembed.setDescription(`${member} daha önceden <@&${mentionsrol}> rolüne zaten sahip değilmiş.`))    
message.channel.send(embed.setDescription(`${member} üyesinden <@&${mentionsrol}> rolü alındı.`))
member.roles.remove(mentionsrol)

client.channels.cache.get(logs.RolLog).send(embed.setDescription(`
${member} adlı üyenin <@&${mentionsrol}> rolü **alındı** ! ${other.Reddet} 

━━━━━━━━━━━━━━━━━
\`❯\` Kullanıcı: ${member} | \`${member.id}\`
\`❯\` Yetkili: ${message.author} | \`${message.author.id}\`
\`❯\` Alınan Rol: <@&${mentionsrol}> 
\`❯\` Kanal: **\`${message.channel.name}\`** (<#${message.channel.id}>)
━━━━━━━━━━━━━━━━━
\`❯\` Tarih: ${moment(+Date.now()).format("LLL")}
`).setColor('#318dac'))
}
}}