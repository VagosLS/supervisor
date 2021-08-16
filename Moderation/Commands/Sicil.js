const { MessageEmbed } = require('discord.js')
const moment = require('moment')
const ms = require('ms')
const Staff = require('../Models/Staffs')
const Penal = require('../Models/Penals')
const Counter = require('../Models/Counters')

module.exports = {
conf: {name: 'sicil', aliases: ["üye-kontrol"], help: "!sicil @Striga/ID"},
stg: async(client, message, args, config, embed, nembed, role, logs, perms, other) => {
if(!message.member.roles.cache.get(perms.JailPermissions) && !message.member.roles.cache.get(perms.BanPermissions) && !perms.OwnerPermissions.some(x => message.member.roles.cache.get(x)) && !perms.ManagerPermissions.some(x => message.member.roles.cache.get(x)) && !perms.AllPenalsPermissions.some(x => message.member.roles.cache.get(x)) && !message.member.hasPermission('ADMINISTRATOR')) return 

const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!member) return message.channel.send(nembed.setDescription(`Bir üye belirtin ve tekrar deneyin.`))

let ActivitiyNow = await Penal.findOne({UserID: member.id, Active: true});
let CezaPuan = await Counter.findOne({UserID: member.id, GuildID: message.guild.id})

Penal.find({UserID: member.id}, async(err, data) => {
if(err) console.log(err)
if(data.length < 1) return message.channel.send(nembed.setDescription(`${member} adlı üyenin veritabanında kayıtlı bir cezası bulunmamaktadır.`))

allPenals = data.reverse().reverse()
let UserPenals = allPenals.map(x => `❯ \`#${x.ID}\` \`${x.Active === true ? "✅":"❌"}\` | **[${x.Type}]** ${x.Reason} - ${x.Time} (${moment(+x.Date).format("DD.MM.YYYY")})`).join('\n')

message.channel.send(embed.setDescription(`
${member} adlı üyenin **${data.length}** tane cezası bulunmakta.

• Üye toplamda **${CezaPuan.PenalPoint}** ceza puanına sahip.
• \`!ceza sorgu/kontrol Numara\` komutuyla aratabilirsiniz.

${UserPenals}`))

})

}}
