const { MessageEmbed } = require('discord.js')
const moment = require('moment')
const ms = require('ms')
const Staff = require('../Models/Staffs')
const Penal = require('../Models/Penals')
const Counter = require('../Models/Counters')

module.exports = {
conf: {name: 'rol-sırala', aliases: ["sırala", "üyeler", "listele"], help: "!jail @Striga/ID süre sebep"},
stg: async(client, message, args, config, embed, nembed, role, logs, perms, other, points) => {
if(!perms.OwnerPermissions.some(x => message.member.roles.cache.get(x)) && !perms.ManagerPermissions.some(x => message.member.roles.cache.get(x)) && !message.member.hasPermission('ADMINISTRATOR')) return 
let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
if(!rol) return message.channel.send(nembed.setDescription(`Bir rol etiketle ve tekrar dene.`))
let memberList = rol.members.map(m => `${m} | \`${m.id}\``).join("\n")
let roleDate = moment(rol.createdAt)
let date = `${roleDate.format(`LLL`)}`
message.channel.send(embed.setColor(rol.hexColor).setDescription(`${rol} - (\`${rol.id}\`) rolünün bilgileri;
\`Rol Adı:\` ${rol.name}
\`Rol ID:\` ${rol.id}
\`Rol oluşturulma tarihi:\` ${date}
\`Roldeki kişi sayısı:\` ${rol.members.size}

*Rolde bulunan üyeleri listelemek için aşşağıdaki emojiye basmanız yeterli.*
`)).then(async msg => {
let emoji = "🔻"
await msg.react(emoji)
const qwe = (reaction, user) => reaction.emoji.name === emoji && user.id === message.author.id; 
const collector = msg.createReactionCollector(qwe, { time: 20000, max: 1 })

collector.on("collect", async() => {
 await msg.reactions.removeAll()
if(memberList.length >= 2000) return msg.edit(embed.setDescription(`**Karakter sınırını aştığı için üyeleri sıralayamıyorum.**`))
 await msg.edit(embed.setDescription(`${rol} - (\`${rol.id}\`) rolündeki kişiler;

${memberList}`))
})
})


}}
