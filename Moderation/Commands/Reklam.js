const { MessageEmbed } = require('discord.js')
const moment = require('moment')
const ms = require('ms')
const Staff = require('../Models/Staffs')
const Penal = require('../Models/Penals')
const Counter = require('../Models/Counters')

module.exports = {
conf: {name: 'reklam', aliases: ["req", "reklamcı"], help: "!reklam @Striga/ID süre sebep"},
stg: async(client, message, args, config, embed, nembed, role, logs, perms, other, points) => {
if(!message.member.roles.cache.get(perms.JailPermissions) && !perms.OwnerPermissions.some(x => message.member.roles.cache.get(x)) && !perms.ManagerPermissions.some(x => message.member.roles.cache.get(x)) && !perms.AllPenalsPermissions.some(x => message.member.roles.cache.get(x)) && !message.member.hasPermission('ADMINISTRATOR')) return 

const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
const sebep = args.splice(1).join(" ") || "Reklam";
if(!member) return message.channel.send(nembed.setDescription(`Bir üye belirtin ve tekrar deneyin.`))
if(!sebep) return message.channel.send(nembed.setDescription(`Cezayı bir sebep belirtmeden uygulayamazsınız.`))
if(member.id === message.author.id) return message.channel.send(nembed.setDescription(`Kendinize ceza veremezsiniz.`))

if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(nembed.setDescription(`Bu kullanıcı sizden üst/aynı pozisyonda.`));
if(member.roles.cache.get(role.JailRole)) return message.channel.send(nembed.setDescription(`Kullanıcı şuanda Jail'da cezası bittiğinide tekrar deneyin.`)) 

if(!member.manageable) return message.channel.send(nembed.setDescription(`Bu kullanıcıya herhangi bir işlem uygulayamıyorum (yetkim aşağıda olabilir.)`))
let count = await Penal.countDocuments().exec(); count = count == 0 ? 1 : count + 1;

const doc = new Penal({GuildID: message.guild.id, ID: count, UserID: member.id, Active: true, Admin: message.author.id, Type: client.Types.Reklam, Time: "Yok", Reason: sebep, Date: Date.now(), FinishDate: "Belirsiz", Finisher: "Yok"})
doc.save().catch(err => console.log(`Reklam datası kayıt edilirken bir sorun ile karşılaştım.\n${err}`))

Penal.findOne({GuildID: message.guild.id, UserID: message.author.id}, async(err, data) => {
if(!data) {new Staff({GuildID: message.guild.id, UserID: message.author.id, JailTotal: 1, CommandsTotal: 1}).save().catch(err => console.log(`Reklam (YETKİLİ) datası kayıt edilirken bir sorun ile karşılaştım.\n${err}`))} else {data.JailTotal++; data.CommandsTotal++; data.save();}})

Counter.findOne({GuildID: message.guild.id, UserID: member.id}, async(err, data) => {
if(!data) {new Counter({GuildID: message.guild.id, UserID: member.id, PenalPoint: 100}).save().catch(err => console.log(`Reklam (PUAN) datası kayıt edilirken bir sorun ile karşılaştım.\n${err}`))} else { data.PenalPoint = Number(data.PenalPoint + 100); data.save();}})

message.channel.send(`${member} üyesi **reklam** yaptığı için hapiste olacak. (Ceza Numarası: \`#${count}\`)`)

await member.roles.set(member.roles.cache.has(role.BoosterRole) ? [role.BoosterRole, role.JailRole] : [role.JailRole]).catch();

client.channels.cache.get(logs.ReklamLog).send(embed.setDescription(`
${member} adlı üye ${message.author} tarafından "**${sebep}**" gerekçesiyle **Sınırsız** süresince hapise gönderildi. 

\`❯\` Ceza Numarası: \`#${count}\`
\`❯\` Kullanıcı: **${member.user.tag}** | \`${member.id}\`
\`❯\` Yetkili: ${message.author} | \`${message.author.id}\`
\`❯\` Sebep: **\`${sebep}\`**
\`❯\` Süre: **\`Yok\`**
\`❯\` Kanal: **\`${message.channel.name}\`** (<#${message.channel.id}>)
━━━━━━━━━━━━━━━━━━━
\`❯\` Tarih: ${moment(+Date.now()).format("LLL")}
`).setColor('GREEN'))


}}
