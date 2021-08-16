const { MessageEmbed } = require('discord.js')
const moment = require('moment')
const ms = require('ms')
const CrewModel = require('../Models/Crews')

module.exports = {
conf: {name: 'ekip', aliases: ["crew"], help: "!ekip ekle/sil/say/toplam"},
stg: async(client, message, args, config, embed, nembed, role, logs, perms, other, points) => {
if(!message.member.hasPermission('ADMINISTRATOR')) return 

let belirt = args[0]
if(!belirt) return message.channel.send(embed.setDescription(`
\`❯\` **!ekip**: sunucunun ekip menüsünü açar.
\`❯\` **!ekip ekle tag 0005 @Striga/ID**: sunucuya ekip ekler. 
\`❯\` **!ekip sil tag**: sunucudaki ekibi siler.
\`❯\` **!ekip bilgi**: ekip dökümanlarını gösterir.
\`❯\` **!ekip kontrol**: ekibin şuanki istatistiğini gösterir.
\`❯\` **!ekip sesli**: ekiplerin ses istatistiğini gösterir.`))

let ekiptag = args[1];
let etikettag = args[2];
let ekipowner = message.mentions.members.first() || message.guild.members.cache.get(args[3]);

if(belirt === "ekle") {
if(!ekiptag) return message.channel.send(nembed.setDescription(`Ekip tagını belirtmelisiniz.\n\`!ekip ekle ${config.Tag} 0001 @Striga/ID\``))
if(!etikettag) return message.channel.send(nembed.setDescription(`Ekip etiketi belirtmelisiniz.\n\`!ekip ekle ${config.Tag} 0001 @Striga/ID\``))
if(!ekipowner) return message.channel.send(nembed.setDescription(`Ekip kurucusu belirtmelisiniz.\n\`!ekip ekle ${config.Tag} 0001 @Striga/ID\``))

// Rol Kurulumu
message.guild.roles.create({data: {name: `${ekiptag} #${etikettag}`, color: "RANDOM", mentionable: false}, reason: "Ekip eklendi"
}).then(async (role) => {await CrewModel.findOneAndUpdate({ GuildID: role.guild.id }, 
{ $push: { Crews: { 
CrewTag: ekiptag, 
CrewNumbers: etikettag || "Yok", 
CrewOwner: ekipowner.id, 
ServerJoinDate: Date.now(), 
CrewRole: role.id }}},
{ upsert: true })
message.guild.members.cache.forEach(ekip => {if (ekip.user.username.includes(ekiptag)) {ekip.roles.add(role.id)}})
message.guild.members.cache.forEach(ekip => {if (ekip.user.discriminator.includes(etikettag)) {ekip.roles.add(role.id)}})
message.channel.send(embed.setDescription(`
**${ekiptag} #${etikettag}** (<@&${role.id}>) Artık Sunucumuzun Ekiplerinden !

\`❯\` Ekip Tag: ${ekiptag} | #${etikettag}
\`❯\` Ekip Kurucusu: ${ekipowner} | (${ekipowner.id})
\`❯\` Ekip Rolü: <@&${role.id}> | (${role.id})
\`❯\` Katılım Tarihi: ${moment(+Date.now()).format("LLL")}

\`❯\` Toplam Taglı: ${message.guild.members.cache.filter(m => m.user.discriminator.includes(etikettag)).size + message.guild.members.cache.filter(m => m.user.username.toLowerCase().includes(ekiptag)).size} (Tag: ${message.guild.members.cache.filter(m => m.user.username.toLowerCase().includes(ekiptag)).size}, Etiket: ${message.guild.members.cache.filter(m => m.user.discriminator.includes(etikettag)).size})
`).setFooter(`Aramıza katıldığınız için çok mutluyuz !`))
})

}

if(belirt === "sil") {
if(!ekiptag) return message.channel.send(nembed.setDescription(`Ekip tagını belirtmelisiniz.\n\`!ekip sil Tag\``))
let silinen = await CrewModel.findOne({GuildID: message.guild.id})

const ekip = silinen.Crews.filter(a => a.CrewTag == ekiptag).map(e => e.CrewTag)
const ekipadmin = silinen.Crews.filter(a => a.CrewTag == ekiptag).map(e => e.CrewOwner)
const ekiprol = silinen.Crews.filter(a => a.CrewTag == ekiptag).map(e => e.CrewRole)
if(!ekip) return message.channel.send(nembed.setDescription("Belirtilen ekip bulunamadı geçerli bir ekip belirtin."))
await message.channel.send(embed.setDescription(`\`${ekip}\` (${message.guild.members.cache.get(`${ekipadmin}`)}) adlı ekip sunucudan çıkartıldı !`)).catch(err => console.log(`Mesaj Atılırken Sorun Yaşandı (EKİP)`))
await message.guild.roles.cache.get(`${ekiprol}`).delete({ reason: "Ekip Sunucudan Çıkartıldı" }).catch(err => console.log(`Rol silinirken sorun çıktı (EKİP)`))
setTimeout(async () => { await CrewModel.updateOne({ GuildID: message.guild.id }, { $pull: { Crews: { CrewTag: ekiptag } } }) }, 4000);
}

if(belirt === "bilgi") {
if(!ekiptag) return message.channel.send(nembed.setDescription(`Ekip tagını belirtmelisiniz.\n\`!ekip bilgi Tag\``))
let ara = await CrewModel.findOne({GuildID: message.guild.id})
const arama =  ara.Crews.filter(a => a.CrewTag == ekiptag).map(a =>`
**${config.Tag} ${a.CrewTag} #${a.CrewNumbers} Bilgileri;**

\`❯\` Ekip Tag: \`(${a.CrewTag} - #${a.CrewNumbers})\`
\`❯\` Ekip Kurucusu: ${message.guild.members.cache.get(a.CrewOwner)} | (**${a.CrewOwner}**)
\`❯\` Ekip Rolü: <@&${a.CrewRole}> | (**${a.CrewRole}**)
\`❯\` Katılım Tarihi: **${moment(+a.ServerJoinDate).format("LLL")}**

\`❯\` Toplam Taglı: ${message.guild.members.cache.filter(m => m.user.discriminator.includes(a.CrewNumbers)).size + message.guild.members.cache.filter(m => m.user.username.toLowerCase().includes(a.CrewTag)).size} (Tag: ${message.guild.members.cache.filter(m => m.user.username.toLowerCase().includes(a.CrewTag)).size}, Etiket: ${message.guild.members.cache.filter(m => m.user.discriminator.includes(a.CrewNumbers)).size})
`)

if(!arama) return message.channel.send(nembed.setDescription(`Aranılan tagda bir ekip veritabanında yok.`))
message.channel.send(embed.setDescription(`${arama}`))
}

if(belirt === "liste") {
let ara = await CrewModel.findOne({GuildID: message.guild.id})    
let crewPage = ara.Crews.length > 0 ? ara.Crews.map((value) => `
**${config.Tag} ${value.CrewTag} #${value.CrewNumbers} Bilgileri;**

\`•\` **Ekibin Tagı ve Etiket Tagı:** \`(${value.CrewTag} - ${value.CrewNumbers})\`
\`•\` **Ekibin Sorumlusu ve Yöneticisi:** <@!${value.CrewOwner}>
\`•\` **Ekibin Sunucuya Katılma Tarihi:** ${moment(+value.ServerJoinDate).format("LLL")}
\`•\` **Ekibin Rolü:** <@&${value.CrewRole}>
\`•\` **Ekip Yöneticisi Seste mi?:** \`${message.guild.members.cache.get(value.CrewOwner).voice.channelID ? "Seste" : "Seste Değil"}\`

━━━━━━━━━━━━━━━`).join("\n") : `\`Sunucumuzda ekip bulunmuyor!\``;
message.channel.send(embed.setDescription(`**Sunucumuzda toplamda \`${ara.Crews.length}\` ekibimiz bulunmakta.nBu ekiplerin dökümanları aşağıda listelendi.**\n${crewPage}`))
}

if(belirt === "aresinannesi" || belirt === "kontrol") {
if(!ekiptag) return message.channel.send(nembed.setDescription(`Ekip tagını belirtmelisiniz.\n\`!ekip bilgi Tag\``))
let ara = await CrewModel.findOne({GuildID: message.guild.id})
const arama =  ara.Crews.filter(a => a.CrewTag == ekiptag).map(a =>`

**\`${a.CrewTag}\`** ekibinin bilgileri gösteriliyor!
        
\`❯\` **Yöneticisi:** ${message.guild.members.cache.get(a.CrewOwner) || message.guild.members.cache.get(a.CrewOwner).user.tag}
\`❯\` **Yöneticisi Seste mi ?:** \`${message.guild.members.cache.get(a.CrewOwner).voice.channelID ? "Seste" : "Seste Değil"}\`
\`❯\` **Seste Olan Taglı:** \`${message.guild.members.cache.filter(s => s.user.username.toLowerCase().includes(a.CrewTag)).filter(s => s.voice.channel).size || "0"}\`
\`❯\` **Sesli Olan Etiket Taglı:** \`${message.guild.members.cache.filter(s => s.user.discriminator.includes(a.CrewNumbers)).filter(s => s.voice.channel).size || "0"}\`
\`❯\` **Ekipte Seste Olan Toplam Taglı:** \`${message.guild.members.cache.filter(s => s.user.discriminator.includes(a.CrewNumbers)).filter(s => s.voice.channel).size + message.guild.members.cache.filter(s => s.user.username.includes(a.CrewTag)).filter(s => s.voice.channel).size || 0}\`
`)
if(!arama) return message.channel.send(nembed.setDescription(`Aranılan tagda bir ekip veritabanında yok.`))
message.channel.send(embed.setDescription(`${arama}`))
}

if(belirt === "sesli") {

let ara = await CrewModel.findOne({GuildID: message.guild.id})    
let crewSoundList = ara.Crews.length > 0 ? ara.Crews.map((value) => `• \`${value.CrewTag}\`  ekibi sesli kanallarda **${message.guild.members.cache.filter(s => s.user.discriminator.includes(value.CrewNumbers)).filter(s => s.voice.channel).size + message.guild.members.cache.filter(s => s.user.username.includes(value.CrewTag)).filter(s => s.voice.channel).size || 0}** kişi`).join(`\n`) : "Sunucuda Ekip Yok."
message.channel.send(embed.setDescription(`
**Toplam ekiplerin sesli kanallarda **
───────────────
${crewSoundList}`))
}


}}