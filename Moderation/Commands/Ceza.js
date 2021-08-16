const { MessageEmbed } = require('discord.js')
const moment = require('moment')
const ms = require('ms')
const Staff = require('../Models/Staffs')
const Penal = require('../Models/Penals')
moment.locale('tr')
module.exports = {
conf: {name: 'ceza', aliases: ["penal"], help: "!ceza ID/Numara"},
stg: async(client, message, args, config, embed, nembed, role, logs, perms, other) => {
if(!message.member.roles.cache.get(perms.JailPermissions) && !message.member.roles.cache.get(perms.BanPermissions) && !perms.OwnerPermissions.some(x => message.member.roles.cache.get(x)) && !perms.ManagerPermissions.some(x => message.member.roles.cache.get(x)) && !perms.AllPenalsPermissions.some(x => message.member.roles.cache.get(x)) && !message.member.hasPermission('ADMINISTRATOR')) return 

if(args[0] === "sorgu" || args[0] === "kontrol" || args[0] === "bilgi") {
moment.locale('tr')    
let belirtv2 = Number(args[1])
if(!belirtv2) return message.channel.send(nembed.setDescription(`Öncelikle bir ID belirt ve tekrar dene.`))
if(!Number(args[1])) return message.channel.send(nembed.setDescription(`IDyi sadece sayı belirtmen gerekiyor.`))
Penal.findOne({ID: belirtv2}, async(err, data) => {
if(err) console.log(err)
if(!data) return message.channel.send(nembed.setDescription(`${belirtv2} numaralı herhangi bir ceza bulunamadı.`))

let bitiren;
if(data.Finisher === "Yok") {
bitiren = ``
} else {
bitiren = `\n\`❯\` Cezayı Kaldıran: <@${data.Finisher}> (\`${data.Finisher}\`)`
}

let bitis;
if(data.FinishDate === "Belirsiz") {
bitis = ``
} else {
bitis = `\n\`❯\` Ceza Bitişi: ${moment(+data.FinishDate).format("LLL")}`
}


message.channel.send(embed.setDescription(`
${belirtv2} numaralı ceza <@${data.UserID}> (\`${data.UserID}\`) adlı kullanıcıya <@${data.Admin}> tarafından uygulanmış. 

━━━━━━━━━━━━━━━━━━━━━
\`❯\` Ceza Numarası: **#${data.ID}**
\`❯\` Kullanıcı: <@${data.UserID}> (\`${data.UserID}\`)
\`❯\` Yetkili: <@${data.Admin}> (\`${data.Admin}\`)

\`❯\` Ceza Türü: ${data.Type}
\`❯\` Ceza Sebebi: ${data.Reason}
\`❯\` Ceza Süresi: ${data.Time}
\`❯\` Ceza Tarihi: ${moment(+data.Date).format("LLL")}${bitis}

\`❯\` Ceza Aktif mi ?: \`${data.Active === true ? `✅ Aktif`:`❌ Aktif Değil`}\`${bitiren}
━━━━━━━━━━━━━━━━━━━━━

Kullanıcının diğer cezalarını kontrol etmek için \`!sicil @Striga/ID\` komutunu kullanabilirsiniz.

`))

})

}
}}
