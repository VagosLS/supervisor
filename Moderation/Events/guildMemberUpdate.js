const { Discord, MessageEmbed, Client, Collection } = require('discord.js')
const Penal = require('../Models/Penals')
const RoleDatabase = require('../Models/Users')
const role = require('../Settings/Roles.json')
const logs = require('../Settings/Logs.json')
const other = require('../Settings/Other.json')
const settings = require('../config')
const moment = require('moment')
moment.locale('tr')
module.exports = async (oldMember, newMember) => {


await newMember.guild.fetchAuditLogs({type: "MEMBER_ROLE_UPDATE"}).then(async (audit) => {
let conf = audit.entries.first()
let uye = conf.target
let yetkili = conf.executor
if (yetkili.bot) return  
newMember.roles.cache.forEach(async role => {
if (!oldMember.roles.cache.has(role.id)) {

let ekleme = new MessageEmbed()
.setAuthor(uye.tag, uye.displayAvatarURL({dynamic:true}))
.setDescription(` 
${uye} adlı üyeye ${role} rolü **verildi** ! ${other.Onayla}
━━━━━━━━━━━━━━━━━
❯ Üye: ${uye} - (\`${uye.id}\`)
❯ Yetkili: ${yetkili} - (\`${yetkili.id}\`)
❯ Verilen Rol: ${role} - (\`${role.id}\`)
❯ Tarih: ${moment(+Date.now()).format("LLL")}`)
.setColor('#9088D4')
.setFooter(yetkili.tag, yetkili.displayAvatarURL({dynamic:true}))    

client.channels.cache.get(logs.AutoRolLog).send(ekleme)
}})

oldMember.roles.cache.forEach(async role => {
if (!newMember.roles.cache.has(role.id)) {

let kaldırma = new MessageEmbed()
.setAuthor(uye.tag, uye.displayAvatarURL({dynamic:true}))
.setDescription(` 
${uye} adlı üyeden ${role} rolü **alındı** ! ${other.Reddet}
━━━━━━━━━━━━━━━━━
❯ Üye: ${uye} - (\`${uye.id}\`)
❯ Yetkili: ${yetkili} - (\`${yetkili.id}\`)
❯ Alınan Rol: ${role} - (\`${role.id}\`)
❯ Tarih: ${moment(+Date.now()).format("LLL")}
`)
.setColor('#FF616D')
.setFooter(yetkili.tag, yetkili.displayAvatarURL({dynamic:true}))    

client.channels.cache.get(logs.AutoRolLog).send(kaldırma)
}})}).catch(err => console.log())

}
module.exports.configuration = {name: "guildMemberUpdate"}