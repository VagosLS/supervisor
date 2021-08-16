const { MessageEmbed } = require('discord.js')
const moment = require('moment')
const ms = require('ms')
const Staff = require('../Models/Staffs')
const Penal = require('../Models/Penals')
const Counter = require('../Models/Counters')

module.exports = {
conf: {name: 'sorumluluk', aliases: ["sormululuklar", "sorumluluk-listele"], help: "!sorumluluk ver @Striga/ID Sorumluluk İsmi"},
stg: async(client, message, args, config, embed, nembed, role, logs, perms, other, points) => {
if(!perms.OwnerPermissions.some(x => message.member.roles.cache.get(x)) && !perms.ManagerPermissions.some(x => message.member.roles.cache.get(x)) && !message.member.hasPermission('ADMINISTRATOR')) return
let positiveDay = args[0]  

let pubrolu = `${role.PublicResponsible ? `${message.guild.roles.cache.get(role.PublicResponsible).members.size}` : "0"}`
let chatrolu = `${role.ChatResponsible ? `${message.guild.roles.cache.get(role.ChatResponsible).members.size}` : "0"}`
let registerrolu = `${role.RegisterResponsible ? `${message.guild.roles.cache.get(role.RegisterResponsible).members.size}` : "0"}`
let inviterolu = `${role.InviteResponsible ? `${message.guild.roles.cache.get(role.InviteResponsible).members.size}` : "0"}`
let tagrolu = `${role.tagResponsible ? `${message.guild.roles.cache.get(role.tagResponsible).members.size}` : "0"}`
let yetkilirolu = `${role.StaffResponsible ? `${message.guild.roles.cache.get(role.StaffResponsible).members.size}` : "0"}`
let streamerrolu = `${role.StreamerResponsible ? `${message.guild.roles.cache.get(role.StreamerResponsible).members.size}` : "0"}`
let oyunrolu = `${role.GamesResponsible ? `${message.guild.roles.cache.get(role.GamesResponsible).members.size}` : "0"}`
let etkinlikrolu = `${role.EtkinlikResponsible ? `${message.guild.roles.cache.get(role.EtkinlikResponsible).members.size}` : "0"}`
let sponsorrolu = `${role.SponsorResponsible ? `${message.guild.roles.cache.get(role.SponsorResponsible).members.size}` : "0"}`

if(!positiveDay) return message.channel.send(embed
.setDescription(`
Sunucunun Sorumluluk Listesi;

❯ \`Public Sorumlusu:\` **!sorumluluk ver/al @Striga/ID public** (\`${role.PublicResponsible ? "✅":"❌"}\`)
❯ \`Chat Sorumlusu:\` **!sorumluluk ver/al @Striga/ID chat** (\`${role.ChatResponsible ? "✅":"❌"}\`)
❯ \`Teyit Sorumlusu:\` **!sorumluluk ver/al @Striga/ID teyit** (\`${role.RegisterResponsible ? "✅":"❌"}\`)
❯ \`Invite Sorumlusu:\` **!sorumluluk ver/al @Striga/ID invite** (\`${role.InviteResponsible ? "✅":"❌"}\`)
❯ \`Tag Sorumlusu:\` **!sorumluluk ver/al @Striga/ID tag** (\`${role.tagResponsible ? "✅":"❌"}\`)
❯ \`Yetkili Sorumlusu:\` **!sorumluluk ver/al @Striga/ID yetkili** (\`${role.StaffResponsible ? "✅":"❌"}\`)
❯ \`Streamer Sorumlusu:\` **!sorumluluk ver/al @Striga/ID streamer** (\`${role.StreamerResponsible ? "✅":"❌"}\`)
❯ \`Games Sorumlusu:\` **!sorumluluk ver/al @Striga/ID games** (\`${role.GamesResponsible ? "✅":"❌"}\`)
❯ \`Etkinlik Sorumlusu:\` **!sorumluluk ver/al @Striga/ID etkinlik** (\`${role.EtkinlikResponsible ? "✅":"❌"}\`)
❯ \`Sponsor Sorumlusu:\` **!sorumluluk ver/al @Striga/ID sponsor** (\`${role.SponsorResponsible ? "✅":"❌"}\`)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• \`Public\` Sorumluluğunda **${pubrolu}** kişi bulunmakta.
• \`Chat\` Sorumluluğunda **${chatrolu}** kişi bulunmakta.
• \`Teyit\` Sorumluluğunda **${registerrolu}** kişi bulunmakta.
• \`Invite\` Sorumluluğunda **${inviterolu}** kişi bulunmakta.
• \`Tag\` Sorumluluğunda **${tagrolu}** kişi bulunmakta.
• \`Yetkili\` Sorumluluğunda **${yetkilirolu}** kişi bulunmakta.
• \`Streamer\` Sorumluluğunda **${streamerrolu}** kişi bulunmakta.
• \`Games\` Sorumluluğunda **${oyunrolu}** kişi bulunmakta.
• \`Etkinlik\` Sorumluluğunda **${etkinlikrolu}** kişi bulunmakta.
• \`Sponsor\` Sorumluluğunda **${sponsorrolu}** kişi bulunmakta.

`).setFooter(`Sorumluluk rolleri ayarlı ise yanlarında ✅ işareti ayarlı değilse ❌ işareti bulunmaktadır.`))

if(positiveDay === "ver" || positiveDay === "ekle") {
const member = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
const sorumluluk = args[2]
if(!member) return message.channel.send(nembed.setDescription(`Bir üye belirtin ve tekrar deneyin.`))
if(!sorumluluk) return message.channel.send(nembed.setDescription(`Bir sorumluluk belirtin ve tekrar deneyin.`))


if(sorumluluk === "public") { //PUBLİC VER
if(member.roles.cache.get(role.PublicResponsible)) return message.channel.send(nembed.setDescription(`${member} adlı üye zaten bu sorumluluğa sahip.`))            
message.channel.send(embed.setDescription(`${member} adlı üye artık sunucumuzun yeni bir **Public** sorumlusu.`))    
member.roles.add(role.PublicResponsible).catch(err => console.log('Sorumluluk (Public Rolü) Bulunamadı'))
client.channels.cache.get(logs.SorumlulukLog).send(embed.setDescription(`
${member} adlı üye artık **Public** sorumlusu. ${other.Onayla}
━━━━━━━━━━━━━━━━━
Üye: ${member} | \`${member.id}\`
Yetkili: ${message.author} | \`${message.author.id}\`
Sorumluluk Rolü: ${role.PublicResponsible ? `<@&${role.PublicResponsible}>`: `Rol Bulunamadı.`}
Tarih: ${moment(+Date.now()).format("LLL")}
`))} //PUBLİC BİTİŞ



if(sorumluluk === "chat") { //CHAT VER
if(member.roles.cache.get(role.ChatResponsible)) return message.channel.send(nembed.setDescription(`${member} adlı üye zaten bu sorumluluğa sahip.`))            
message.channel.send(embed.setDescription(`${member} adlı üye artık sunucumuzun yeni bir **Chat** sorumlusu.`))    
member.roles.add(role.ChatResponsible).catch(err => console.log('Sorumluluk (Chat Rolü) Bulunamadı'))
client.channels.cache.get(logs.SorumlulukLog).send(embed.setDescription(`
${member} adlı üye artık **Chat** sorumlusu. ${other.Onayla}
━━━━━━━━━━━━━━━━━
Üye: ${member} | \`${member.id}\`
Yetkili: ${message.author} | \`${message.author.id}\`
Sorumluluk Rolü: ${role.ChatResponsible ? `<@&${role.ChatResponsible}>`: `Rol Bulunamadı.`}
Tarih: ${moment(+Date.now()).format("LLL")}
`))} //CHAT BİTİŞ



if(sorumluluk === "teyit") { //TEYİT VER
if(member.roles.cache.get(role.RegisterResponsible)) return message.channel.send(nembed.setDescription(`${member} adlı üye zaten bu sorumluluğa sahip.`))            
message.channel.send(embed.setDescription(`${member} adlı üye artık sunucumuzun yeni bir **Teyit** sorumlusu.`))    
member.roles.add(role.RegisterResponsible).catch(err => console.log('Sorumluluk (Register Rolü) Bulunamadı'))
client.channels.cache.get(logs.SorumlulukLog).send(embed.setDescription(`
${member} adlı üye artık **Teyit** sorumlusu. ${other.Onayla}
━━━━━━━━━━━━━━━━━
Üye: ${member} | \`${member.id}\`
Yetkili: ${message.author} | \`${message.author.id}\`
Sorumluluk Rolü: ${role.RegisterResponsible ? `<@&${role.RegisterResponsible}>`: `Rol Bulunamadı.`}
Tarih: ${moment(+Date.now()).format("LLL")}
`))} //TEYİT BİTİŞ



if(sorumluluk === "invite") { //INVITE VER
if(member.roles.cache.get(role.InviteResponsible)) return message.channel.send(nembed.setDescription(`${member} adlı üye zaten bu sorumluluğa sahip.`))            
message.channel.send(embed.setDescription(`${member} adlı üye artık sunucumuzun yeni bir **Invite** sorumlusu.`))    
member.roles.add(role.InviteResponsible).catch(err => console.log('Sorumluluk (İnvite Rolü) Bulunamadı'))
client.channels.cache.get(logs.SorumlulukLog).send(embed.setDescription(`
${member} adlı üye artık **Invite** sorumlusu. ${other.Onayla}
━━━━━━━━━━━━━━━━━
Üye: ${member} | \`${member.id}\`
Yetkili: ${message.author} | \`${message.author.id}\`
Sorumluluk Rolü: ${role.InviteResponsible ? `<@&${role.InviteResponsible}>`: `Rol Bulunamadı.`}
Tarih: ${moment(+Date.now()).format("LLL")}
`))} //INVITE BİTİŞ



if(sorumluluk === "tag") { //TAG VER
if(member.roles.cache.get(role.tagResponsible)) return message.channel.send(nembed.setDescription(`${member} adlı üye zaten bu sorumluluğa sahip.`))            
message.channel.send(embed.setDescription(`${member} adlı üye artık sunucumuzun yeni bir **Tag** sorumlusu.`))    
member.roles.add(role.tagResponsible).catch(err => console.log('Sorumluluk (Tag Rolü) Bulunamadı'))
client.channels.cache.get(logs.SorumlulukLog).send(embed.setDescription(`
${member} adlı üye artık **Tag** sorumlusu. ${other.Onayla}
━━━━━━━━━━━━━━━━━
Üye: ${member} | \`${member.id}\`
Yetkili: ${message.author} | \`${message.author.id}\`
Sorumluluk Rolü: ${role.tagResponsible ? `<@&${role.tagResponsible}>`: `Rol Bulunamadı.`}
Tarih: ${moment(+Date.now()).format("LLL")}
`))} //TAG BİTİŞ



if(sorumluluk === "yetkili") { //STAFF VER
if(member.roles.cache.get(role.StaffResponsible)) return message.channel.send(nembed.setDescription(`${member} adlı üye zaten bu sorumluluğa sahip.`))            
message.channel.send(embed.setDescription(`${member} adlı üye artık sunucumuzun yeni bir **Yetkili** sorumlusu.`))    
member.roles.add(role.StaffResponsible).catch(err => console.log('Sorumluluk (Yetkili Rolü) Bulunamadı'))
client.channels.cache.get(logs.SorumlulukLog).send(embed.setDescription(`
${member} adlı üye artık **Yetkili** sorumlusu. ${other.Onayla}
━━━━━━━━━━━━━━━━━
Üye: ${member} | \`${member.id}\`
Yetkili: ${message.author} | \`${message.author.id}\`
Sorumluluk Rolü: ${role.StaffResponsible ? `<@&${role.StaffResponsible}>`: `Rol Bulunamadı.`}
Tarih: ${moment(+Date.now()).format("LLL")}
`))} //STAFF BİTİŞ



if(sorumluluk === "streamer") { //STREAMER VER
if(member.roles.cache.get(role.StreamerResponsible)) return message.channel.send(nembed.setDescription(`${member} adlı üye zaten bu sorumluluğa sahip.`))            
message.channel.send(embed.setDescription(`${member} adlı üye artık sunucumuzun yeni bir **Streamer** sorumlusu.`))    
member.roles.add(role.StreamerResponsible).catch(err => console.log('Sorumluluk (Streamer Rolü) Bulunamadı'))
client.channels.cache.get(logs.SorumlulukLog).send(embed.setDescription(`
${member} adlı üye artık **Streamer** sorumlusu. ${other.Onayla}
━━━━━━━━━━━━━━━━━
Üye: ${member} | \`${member.id}\`
Yetkili: ${message.author} | \`${message.author.id}\`
Sorumluluk Rolü: ${role.StreamerResponsible ? `<@&${role.StreamerResponsible}>`: `Rol Bulunamadı.`}
Tarih: ${moment(+Date.now()).format("LLL")}
`))} //STREAMER BİTİŞ



if(sorumluluk === "games" || sorumluluk === "oyun") { //GAMES VER
if(member.roles.cache.get(role.GamesResponsible)) return message.channel.send(nembed.setDescription(`${member} adlı üye zaten bu sorumluluğa sahip.`))            
message.channel.send(embed.setDescription(`${member} adlı üye artık sunucumuzun yeni bir **Oyun** sorumlusu.`))    
member.roles.add(role.GamesResponsible).catch(err => console.log('Sorumluluk (Games Rolü) Bulunamadı'))
client.channels.cache.get(logs.SorumlulukLog).send(embed.setDescription(`
${member} adlı üye artık **Oyun** sorumlusu. ${other.Onayla}
━━━━━━━━━━━━━━━━━
Üye: ${member} | \`${member.id}\`
Yetkili: ${message.author} | \`${message.author.id}\`
Sorumluluk Rolü: ${role.GamesResponsible ? `<@&${role.GamesResponsible}>`: `Rol Bulunamadı.`}
Tarih: ${moment(+Date.now()).format("LLL")}
`))} //GAMES BİTİŞ



if(sorumluluk === "etkinlik") { //ETKİNLİK VER
if(member.roles.cache.get(role.EtkinlikResponsible)) return message.channel.send(nembed.setDescription(`${member} adlı üye zaten bu sorumluluğa sahip.`))            
message.channel.send(embed.setDescription(`${member} adlı üye artık sunucumuzun yeni bir **Etkinlik** sorumlusu.`))    
member.roles.add(role.EtkinlikResponsible).catch(err => console.log('Sorumluluk (Etkinlik Rolü) Bulunamadı'))
client.channels.cache.get(logs.SorumlulukLog).send(embed.setDescription(`
${member} adlı üye artık **Oyun** sorumlusu. ${other.Onayla}
━━━━━━━━━━━━━━━━━
Üye: ${member} | \`${member.id}\`
Yetkili: ${message.author} | \`${message.author.id}\`
Sorumluluk Rolü: ${role.EtkinlikResponsible ? `<@&${role.EtkinlikResponsible}>`: `Rol Bulunamadı.`}
Tarih: ${moment(+Date.now()).format("LLL")}
`))} //ETKİNLİK BİTİŞ



if(sorumluluk === "sponsor") { //SPONSOR VER
if(member.roles.cache.get(role.SponsorResponsible)) return message.channel.send(nembed.setDescription(`${member} adlı üye zaten bu sorumluluğa sahip.`))        
message.channel.send(embed.setDescription(`${member} adlı üye artık sunucumuzun yeni bir **Sponsor** sorumlusu.`))    
member.roles.add(role.SponsorResponsible).catch(err => console.log('Sorumluluk (Sponsor Rolü) Bulunamadı'))
client.channels.cache.get(logs.SorumlulukLog).send(embed.setDescription(`
${member} adlı üye artık **Sponsor** sorumlusu. ${other.Onayla}
━━━━━━━━━━━━━━━━━
Üye: ${member} | \`${member.id}\`
Yetkili: ${message.author} | \`${message.author.id}\`
Sorumluluk Rolü: ${role.SponsorResponsible ? `<@&${role.SponsorResponsible}>`: `Rol Bulunamadı.`}
Tarih: ${moment(+Date.now()).format("LLL")}
`))} //SPONSOR BİTİŞ











} else if (positiveDay === "al" || positiveDay === "kaldır") {
const member = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
const sorumluluk = args[2]
if(!member) return message.channel.send(nembed.setDescription(`Bir üye belirtin ve tekrar deneyin.`))
if(!sorumluluk) return message.channel.send(nembed.setDescription(`Bir sorumluluk belirtin ve tekrar deneyin.`))


if(sorumluluk === "public") { //PUBLİC AL
if(!member.roles.cache.get(role.PublicResponsible)) return message.channel.send(nembed.setDescription(`${member} adlı üye zaten bu sorumluluğa sahip değil.`))        
message.channel.send(embed.setDescription(`${member} adlı üye artık sunucumuzun **Public** sorumlusu değil.`))    
member.roles.remove(role.PublicResponsible).catch(err => console.log('Sorumluluk (Public Rolü) Bulunamadı'))
client.channels.cache.get(logs.SorumlulukLog).send(embed.setDescription(`
${member} adlı üye artık **Public** sorumlusu değil. ${other.Reddet}
━━━━━━━━━━━━━━━━━
Üye: ${member} | \`${member.id}\`
Yetkili: ${message.author} | \`${message.author.id}\`
Sorumluluk Rolü: ${role.PublicResponsible ? `<@&${role.PublicResponsible}>`: `Rol Bulunamadı.`}
Tarih: ${moment(+Date.now()).format("LLL")}
`))} //PUBLİC BİTİŞ



if(sorumluluk === "chat") { //CHAT AL
if(!member.roles.cache.get(role.ChatResponsible)) return message.channel.send(nembed.setDescription(`${member} adlı üye zaten bu sorumluluğa sahip değil.`))    
message.channel.send(embed.setDescription(`${member} adlı üye artık sunucumuzun **Chat** sorumlusu değil.`))    
member.roles.remove(role.ChatResponsible).catch(err => console.log('Sorumluluk (Chat Rolü) Bulunamadı'))
client.channels.cache.get(logs.SorumlulukLog).send(embed.setDescription(`
${member} adlı üye artık **Chat** sorumlusu değil. ${other.Reddet}
━━━━━━━━━━━━━━━━━
Üye: ${member} | \`${member.id}\`
Yetkili: ${message.author} | \`${message.author.id}\`
Sorumluluk Rolü: ${role.ChatResponsible ? `<@&${role.ChatResponsible}>`: `Rol Bulunamadı.`}
Tarih: ${moment(+Date.now()).format("LLL")}
`))} //CHAT BİTİŞ



if(sorumluluk === "teyit") { //TEYİT AL
if(!member.roles.cache.get(role.RegisterResponsible)) return message.channel.send(nembed.setDescription(`${member} adlı üye zaten bu sorumluluğa sahip değil.`))    
message.channel.send(embed.setDescription(`${member} adlı üye artık sunucumuzun **Teyit** sorumlusu değil.`))    
member.roles.remove(role.RegisterResponsible).catch(err => console.log('Sorumluluk (Register Rolü) Bulunamadı'))
client.channels.cache.get(logs.SorumlulukLog).send(embed.setDescription(`
${member} adlı üye artık **Teyit** sorumlusu değil. ${other.Reddet}
━━━━━━━━━━━━━━━━━
Üye: ${member} | \`${member.id}\`
Yetkili: ${message.author} | \`${message.author.id}\`
Sorumluluk Rolü: ${role.RegisterResponsible ? `<@&${role.RegisterResponsible}>`: `Rol Bulunamadı.`}
Tarih: ${moment(+Date.now()).format("LLL")}
`))} //TEYİT BİTİŞ



if(sorumluluk === "invite") { //INVITE AL
if(!member.roles.cache.get(role.InviteResponsible)) return message.channel.send(nembed.setDescription(`${member} adlı üye zaten bu sorumluluğa sahip değil.`))    
message.channel.send(embed.setDescription(`${member} adlı üye artık sunucumuzun **Invite** sorumlusu değil.`))    
member.roles.remove(role.InviteResponsible).catch(err => console.log('Sorumluluk (İnvite Rolü) Bulunamadı'))
client.channels.cache.get(logs.SorumlulukLog).send(embed.setDescription(`
${member} adlı üye artık **Invite** sorumlusu değil. ${other.Reddet}
━━━━━━━━━━━━━━━━━
Üye: ${member} | \`${member.id}\`
Yetkili: ${message.author} | \`${message.author.id}\`
Sorumluluk Rolü: ${role.InviteResponsible ? `<@&${role.InviteResponsible}>`: `Rol Bulunamadı.`}
Tarih: ${moment(+Date.now()).format("LLL")}
`))} //INVITE BİTİŞ



if(sorumluluk === "tag") { //TAG AL
if(!member.roles.cache.get(role.tagResponsible)) return message.channel.send(nembed.setDescription(`${member} adlı üye zaten bu sorumluluğa sahip değil.`))        
message.channel.send(embed.setDescription(`${member} adlı üye artık sunucumuzun **Tag** sorumlusu değil.`))    
member.roles.remove(role.tagResponsible).catch(err => console.log('Sorumluluk (Tag Rolü) Bulunamadı'))
client.channels.cache.get(logs.SorumlulukLog).send(embed.setDescription(`
${member} adlı üye artık **Tag** sorumlusu değil. ${other.Reddet}
━━━━━━━━━━━━━━━━━
Üye: ${member} | \`${member.id}\`
Yetkili: ${message.author} | \`${message.author.id}\`
Sorumluluk Rolü: ${role.tagResponsible ? `<@&${role.tagResponsible}>`: `Rol Bulunamadı.`}
Tarih: ${moment(+Date.now()).format("LLL")}
`))} //TAG BİTİŞ



if(sorumluluk === "yetkili") { //STAFF AL
if(!member.roles.cache.get(role.StaffResponsible)) return message.channel.send(nembed.setDescription(`${member} adlı üye zaten bu sorumluluğa sahip değil.`))    
message.channel.send(embed.setDescription(`${member} adlı üye artık sunucumuzun **Yetkili** sorumlusu değil.`))    
member.roles.remove(role.StaffResponsible).catch(err => console.log('Sorumluluk (Yetkili Rolü) Bulunamadı'))
client.channels.cache.get(logs.SorumlulukLog).send(embed.setDescription(`
${member} adlı üye artık **Yetkili** sorumlusu değil. ${other.Reddet}
━━━━━━━━━━━━━━━━━
Üye: ${member} | \`${member.id}\`
Yetkili: ${message.author} | \`${message.author.id}\`
Sorumluluk Rolü: ${role.StaffResponsible ? `<@&${role.StaffResponsible}>`: `Rol Bulunamadı.`}
Tarih: ${moment(+Date.now()).format("LLL")}
`))} //STAFF BİTİŞ



if(sorumluluk === "streamer") { //STREAMER AL
if(!member.roles.cache.get(role.StreamerResponsible)) return message.channel.send(nembed.setDescription(`${member} adlı üye zaten bu sorumluluğa sahip değil.`))        
message.channel.send(embed.setDescription(`${member} adlı üye artık sunucumuzun **Streamer** sorumlusu değil.`))    
member.roles.remove(role.StreamerResponsible).catch(err => console.log('Sorumluluk (Streamer Rolü) Bulunamadı'))
client.channels.cache.get(logs.SorumlulukLog).send(embed.setDescription(`
${member} adlı üye artık **Streamer** sorumlusu değil. ${other.Reddet}
━━━━━━━━━━━━━━━━━
Üye: ${member} | \`${member.id}\`
Yetkili: ${message.author} | \`${message.author.id}\`
Sorumluluk Rolü: ${role.StreamerResponsible ? `<@&${role.StreamerResponsible}>`: `Rol Bulunamadı.`}
Tarih: ${moment(+Date.now()).format("LLL")}
`))} //STREAMER BİTİŞ



if(sorumluluk === "games" || sorumluluk === "oyun") { //GAMES AL
if(!member.roles.cache.get(role.GamesResponsible)) return message.channel.send(nembed.setDescription(`${member} adlı üye zaten bu sorumluluğa sahip değil.`))    
message.channel.send(embed.setDescription(`${member} adlı üye artık sunucumuzun **Oyun** sorumlusu değil.`))    
member.roles.remove(role.GamesResponsible).catch(err => console.log('Sorumluluk (Games Rolü) Bulunamadı'))
client.channels.cache.get(logs.SorumlulukLog).send(embed.setDescription(`
${member} adlı üye artık **Oyun** sorumlusu değil. ${other.Reddet}
━━━━━━━━━━━━━━━━━
Üye: ${member} | \`${member.id}\`
Yetkili: ${message.author} | \`${message.author.id}\`
Sorumluluk Rolü: ${role.GamesResponsible ? `<@&${role.GamesResponsible}>`: `Rol Bulunamadı.`}
Tarih: ${moment(+Date.now()).format("LLL")}
`))} //GAMES BİTİŞ



if(sorumluluk === "etkinlik") { //ETKİNLİK AL
if(!member.roles.cache.get(role.EtkinlikResponsible)) return message.channel.send(nembed.setDescription(`${member} adlı üye zaten bu sorumluluğa sahip değil.`))        
message.channel.send(embed.setDescription(`${member} adlı üye artık sunucumuzun **Etkinlik** sorumlusu değil.`))    
member.roles.remove(role.EtkinlikResponsible).catch(err => console.log('Sorumluluk (Etkinlik Rolü) Bulunamadı'))
client.channels.cache.get(logs.SorumlulukLog).send(embed.setDescription(`
${member} adlı üye artık **Oyun** sorumlusu değil. ${other.Reddet}
━━━━━━━━━━━━━━━━━
Üye: ${member} | \`${member.id}\`
Yetkili: ${message.author} | \`${message.author.id}\`
Sorumluluk Rolü: ${role.EtkinlikResponsible ? `<@&${role.EtkinlikResponsible}>`: `Rol Bulunamadı.`}
Tarih: ${moment(+Date.now()).format("LLL")}
`))} //ETKİNLİK BİTİŞ



if(sorumluluk === "sponsor") { //SPONSOR AL
if(!member.roles.cache.get(role.SponsorResponsible)) return message.channel.send(nembed.setDescription(`${member} adlı üye zaten bu sorumluluğa sahip değil.`))        
message.channel.send(embed.setDescription(`${member} adlı üye artık **Sponsor** sorumlusu değil.`))    
member.roles.remove(role.SponsorResponsible).catch(err => console.log('Sorumluluk (Sponsor Rolü) Bulunamadı'))
client.channels.cache.get(logs.SorumlulukLog).send(embed.setDescription(`
${member} adlı üye artık **Sponsor** sorumlusu değil. ${other.Reddet}
━━━━━━━━━━━━━━━━━
Üye: ${member} | \`${member.id}\`
Yetkili: ${message.author} | \`${message.author.id}\`
Sorumluluk Rolü: ${role.SponsorResponsible ? `<@&${role.SponsorResponsible}>`: `Rol Bulunamadı.`}
Tarih: ${moment(+Date.now()).format("LLL")}
`))}}


}}


