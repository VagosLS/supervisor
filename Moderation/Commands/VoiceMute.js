const { MessageEmbed } = require('discord.js')
const moment = require('moment')
const ms = require('ms')
const Staff = require('../Models/Staffs')
const Penal = require('../Models/Penals')
const Counter = require('../Models/Counters')
module.exports = {
conf: {name: 'vmute', aliases: ["temp-voice-mute", "süreli-vmute", "tempvmute"], help: "!vmute @Striga/ID süre sebep"},
stg: async(client, message, args, config, embed, nembed, role, logs, perms, other, points) => {
if(!message.member.roles.cache.get(perms.VoiceMutePermissions) && !perms.OwnerPermissions.some(x => message.member.roles.cache.get(x)) && !perms.ManagerPermissions.some(x => message.member.roles.cache.get(x)) && !perms.AllPenalsPermissions.some(x => message.member.roles.cache.get(x)) && !message.member.hasPermission('ADMINISTRATOR')) return 

const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
const sure = args[1]
const sebep = args.splice(2).join(" ");
if(!member) return message.channel.send(nembed.setDescription(`Bir üye belirtin ve tekrar deneyin.`))
if(!sure || !sebep) return message.channel.send(nembed.setDescription(`Cezayı bir süre veya sebep belirtmeden uygulayamazsınız.`))
if(member.id === message.author.id) return message.channel.send(nembed.setDescription(`Kendinize ceza veremezsiniz.`))

if(member.roles.cache.get(role.VoiceMuteRole)) return message.channel.send(nembed.setDescription(`Kullanıcı şuanda zaten Voice Mute cezasına sahip bittiğinde tekrar deneyin.`)) 
if(member.roles.cache.get(role.JailRole)) return message.channel.send(nembed.setDescription(`Kullanıcı şuanda Jail'da cezası bittiğinide tekrar deneyin.`)) 

if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(nembed.setDescription(`Bu kullanıcı sizden üst/aynı pozisyonda.`));
if(!member.manageable) return message.channel.send(nembed.setDescription(`Bu kullanıcıya herhangi bir işlem uygulayamıyorum (yetkim aşağıda olabilir.)`))
let vmutezaman = args[1].replace(`d`," Gün").replace(`s`," Saniye").replace(`h`," Saat").replace(`m`," Dakika").replace(`w`," Hafta"); 
let timereplace = args[0]; let time = timereplace.replace(/y/, ' yıl').replace(/d/, ' gün').replace(/s/, ' saniye').replace(/m/, ' dakika').replace(/h/, ' saat'); var tarih = new Date(Date.now()); var tarih2 = ms(timereplace); var tarih3 = Date.now() + tarih2 +10800000; let ay = moment(Date.now()+10800000).format("MM"); let gün = moment(Date.now()+10800000).format("DD"); let saat = moment(Date.now()+10800000).format("HH:mm:ss"); let yıl = moment(Date.now()+10800000).format("YYYY"); let KomutSure = `\`${gün} ${ay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${saat} (${yıl})\``; moment.locale("tr");
let count = await Penal.countDocuments().exec(); count = count == 0 ? 1 : count + 1;

const doc = new Penal({GuildID: message.guild.id, ID: count, UserID: member.id, Active: true, Admin: message.author.id, Type: client.Types.VoiceMute, Time: vmutezaman, Reason: sebep, Date: Date.now(), FinishDate: Date.now()+ms(sure), Finisher: "Yok"})
doc.save().catch(err => console.log(`Voice Mute datası kayıt edilirken bir sorun ile karşılaştım.\n${err}`))

Staff.findOne({GuildID: message.guild.id, UserID: message.author.id}, async(err, data) => {
if(!data) {new Staff({GuildID: message.guild.id, UserID: message.author.id, VoiceTotal: 1, CommandsTotal: 1,}).save().catch(err => console.log(`Voice Mute (YETKİLİ) datası kayıt edilirken bir sorun ile karşılaştım.\n${err}`))} else {data.VoiceTotal++; data.CommandsTotal++; data.save();}})

Counter.findOne({GuildID: message.guild.id, UserID: member.id}, async(err, data) => {
if(!data) {new Counter({GuildID: message.guild.id, UserID: member.id, PenalPoint: points.VoiceMutePoint}).save().catch(err => console.log(`Voice Mute (PUAN) datası kayıt edilirken bir sorun ile karşılaştım.\n${err}`))} else { data.PenalPoint = Number(data.PenalPoint + points.VoiceMutePoint); data.save();}})


message.channel.send(`${member} üyesi ${vmutezaman} süresi boyunca sesli kanallardan engellenmiş olacak. (Ceza Numarası: \`#${count}\`)`)

if(member.voice.channel) member.voice.setMute(true).catch();
await member.roles.add(role.VoiceMuteRole)

client.channels.cache.get(logs.VoiceMuteLog).send(embed.setDescription(`
${member} adlı üye ${message.author} tarafından "**${sebep}**" gerekçesiyle **${vmutezaman}** süresince sesli kanallardan engellendi. 

\`❯\` Ceza Numarası: \`#${count}\`
\`❯\` Kullanıcı: **${member.user.tag}** | \`${member.id}\`
\`❯\` Yetkili: ${message.author} | \`${message.author.id}\`
\`❯\` Sebep: **\`${sebep}\`**
\`❯\` Süre: **\`${vmutezaman}\`**
\`❯\` Kanal: **\`${message.channel.name}\`** (<#${message.channel.id}>)
━━━━━━━━━━━━━━━━━━━
\`❯\` Tarih: ${moment(+Date.now()).format("LLL")}
\`❯\` Bitiş Tarihi: ${moment(+Date.now()+ms(sure)).format("LLL")}
`).setColor('GREEN'))

}}
