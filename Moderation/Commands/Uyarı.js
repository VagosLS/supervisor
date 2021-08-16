const { MessageEmbed } = require('discord.js')
const moment = require('moment')
const ms = require('ms')
const Staff = require('../Models/Staffs')
const Penal = require('../Models/Penals')

module.exports = {
conf: {name: 'warn', aliases: ["uyar", "uyarı"], help: "!warn @Striga/ID süre sebep"},
stg: async(client, message, args, config, embed, nembed, role, logs, perms, other, points) => {
if(!message.member.roles.cache.get(perms.WarnPermissions) && !perms.OwnerPermissions.some(x => message.member.roles.cache.get(x)) && !perms.ManagerPermissions.some(x => message.member.roles.cache.get(x)) && !perms.AllPenalsPermissions.some(x => message.member.roles.cache.get(x)) && !message.member.hasPermission('ADMINISTRATOR')) return 

const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
const sebep = args.splice(1).join(" ");
if(!member) return message.channel.send(nembed.setDescription(`Bir üye belirtin ve tekrar deneyin.`))
if(!sebep) return message.channel.send(nembed.setDescription(`Cezayı bir sebep belirtmeden uygulayamazsınız.`))
if(member.id === message.author.id) return message.channel.send(nembed.setDescription(`Kendinize ceza veremezsiniz.`))

if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(nembed.setDescription(`Bu kullanıcı sizden üst/aynı pozisyonda.`));
if(member.roles.cache.get(role.JailRole)) return message.channel.send(nembed.setDescription(`Kullanıcı şuanda Jail'da cezası bittiğinide tekrar deneyin.`)) 

if(!member.manageable) return message.channel.send(nembed.setDescription(`Bu kullanıcıya herhangi bir işlem uygulayamıyorum (yetkim aşağıda olabilir.)`))
let timereplace = args[0]; let time = timereplace.replace(/y/, ' yıl').replace(/d/, ' gün').replace(/s/, ' saniye').replace(/m/, ' dakika').replace(/h/, ' saat'); var tarih = new Date(Date.now()); var tarih2 = ms(timereplace); var tarih3 = Date.now() + tarih2 +10800000; let ay = moment(Date.now()+10800000).format("MM"); let gün = moment(Date.now()+10800000).format("DD"); let saat = moment(Date.now()+10800000).format("HH:mm:ss"); let yıl = moment(Date.now()+10800000).format("YYYY"); let KomutSure = `\`${gün} ${ay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${saat} (${yıl})\``; moment.locale("tr");

if(member.roles.cache.get(role.WarnRole_3)) return message.channel.send(`${member} üyesi toplamda 3 kere uyarıldı lütfen ceza işleminizi uygulayınız daha fazla uyarı verilmeyecektir.`)


let count = await Penal.countDocuments().exec(); count = count == 0 ? 1 : count + 1;

const doc = new Penal({
    GuildID: message.guild.id,
    ID: count, 
    UserID: member.id, 
    Active: true,
    Admin: message.author.id, 
    Type: client.Types.Warn,
    Time: "Yok", 
    Reason: sebep,
    Date: Date.now(),
    FinishDate: "Yok",
    Finisher: "Yok"
})
doc.save().catch(err => console.log(`Warn datası kayıt edilirken bir sorun ile karşılaştım.\n${err}`))

Staff.findOne({GuildID: message.guild.id, UserID: message.author.id}, async(err, data) => {
if(!data) {     
new Staff({
    GuildID: message.guild.id,
    UserID: message.author.id, 
    WarnTotal: 1,
    CommandsTotal: 1
}).save().catch(err => console.log(`Warn (YETKİLİ) datası kayıt edilirken bir sorun ile karşılaştım.\n${err}`))
} else { 
data.WarnTotal++
data.CommandsTotal++
data.save();
}
})

Penal.findOne({GuildID: message.guild.id, UserID: member.id}, async(err, data) => {
if(!data) {new Penal({GuildID: message.guild.id, UserID: member.id, PenalPoint: points.WarnPoint}).save().catch(err => console.log(`Warn (PUAN) datası kayıt edilirken bir sorun ile karşılaştım.\n${err}`))} else { data.PenalPoint = Number(data.PenalPoint + points.WarnPoint); data.save();}})


if(member.roles.cache.get(role.WarnRole_1)) {
message.channel.send(`${member} üyesi 2 kez uyarıldı. (Ceza Numarası: \`#${count}\`)`)
member.roles.add(role.WarnRole_2)
}

if(member.roles.cache.get(role.WarnRole_2)) {
message.channel.send(`${member} üyesi 3 kez uyarıldı ve bir daha uyarı verilmeyecek. (Ceza Numarası: \`#${count}\`)`)
member.roles.add(role.WarnRole_3)
}

if(!member.roles.cache.get(role.WarnRole_1)) {
message.channel.send(`${member} üyesi 1 kez uyarıldı. (Ceza Numarası: \`#${count}\`)`)
member.roles.add(role.WarnRole_1)
}

}}
