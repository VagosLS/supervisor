const { MessageEmbed } = require('discord.js')
const moment = require('moment')
const ms = require('ms')
const Staff = require('../Models/Staffs')
const Penal = require('../Models/Penals')

module.exports = {
conf: {name: 'reklamkaldır', aliases: ["un-reklam", "reqbitir"], help: "!reklamkaldır @Striga/ID sebep"},
stg: async(client, message, args, config, embed, nembed, role, logs, perms, other) => {
if(!perms.OwnerPermissions.some(x => message.member.roles.cache.get(x)) && !perms.ManagerPermissions.some(x => message.member.roles.cache.get(x)) && !message.member.hasPermission('ADMINISTRATOR')) return 

const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
const sebep = args.splice(1).join(" ") || "Af"
if(!member) return message.channel.send(nembed.setDescription(`Bir üye belirtin ve tekrar deneyin.`))
if(!sebep) return message.channel.send(nembed.setDescription(`Cezayı bir sebep belirtmeden bitiremezsin.`))
if(member.id === message.author.id) return message.channel.send(nembed.setDescription(`Kendi cezanı bitiremezsin.`))
if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(nembed.setDescription(`Bu kullanıcı sizden üst/aynı pozisyonda.`));
if(!member.manageable) return message.channel.send(nembed.setDescription(`Bu kullanıcıya herhangi bir işlem uygulayamıyorum (yetkim aşağıda olabilir.)`))

Penal.findOne({UserID: member.id, Active: true, Type: client.Types.Reklam}, async(err, data) => { 
if(err) console.log(err)
if(!data) return message.channel.send(`Kullanıcının aktif bir Reklam cezası bulunamadı.`)
await Penal.findOneAndUpdate({UserID: member.id, ID: data.ID, Type: client.Types.Reklam}, { $set: {Active: false, FinishDate: Date.now(), Finisher: message.author.id}});    

message.channel.send(`${member} üyesinin reklam cezası ${message.author} tarafından "${sebep}" gerekçesiyle bitirildi.`)
await member.roles.set(member.roles.cache.has(role.BoosterRole) ? [role.BoosterRole, role.UnregisterRole] : [role.UnregisterRole]).catch();

})

client.channels.cache.get(logs.UnReklamLog).send(embed.setDescription(`
${member} adlı üye ${message.author} tarafından "**${sebep}**" gerekçesiyle reklam cezası bitirildi. 

\`❯\` Kullanıcı: **${member.user.tag}** | \`${member.id}\`
\`❯\` Yetkili: ${message.author} | \`${message.author.id}\`
\`❯\` Sebep: **\`${sebep}\`**
\`❯\` Kanal: **\`${message.channel.name}\`** (<#${message.channel.id}>)
━━━━━━━━━━━━━━━━━━━
\`❯\` Tarih: ${moment(+Date.now()).format("LLL")}
`).setColor('#44125a'))

}}
