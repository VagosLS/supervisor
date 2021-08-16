const { MessageEmbed } = require('discord.js')

module.exports = {
conf: {name: 'say', aliases: ["normal-say", "sunucu-say"], help: "!say"},
stg: async(client, message, args, config, embed, nembed, role, logs, perms, other) => {
if(!perms.OwnerPermissions.some(x => message.member.roles.cache.get(x)) && !perms.ManagerPermissions.some(x => message.member.roles.cache.get(x)) &&!perms.AllPenalsPermissions.some(x => message.member.roles.cache.get(x)) &&  !message.member.hasPermission('ADMINISTRATOR')) return 

let Tag = message.guild.members.cache.filter(member => member.user.username.includes(config.Tag)).size
let ses = message.guild.members.cache.filter(x => x.voice.channel).size
let members = message.guild.members.cache.size
let online = message.guild.members.cache.filter(m => m.presence.status !== "offline").size
let boost = message.guild.premiumSubscriptionCount
let boostlevel = message.guild.premiumTier


message.channel.send(embed.setDescription(`
\`❯\` Şu anda toplam **${ses}** kişi seslide.
\`❯\` Sunucuda **${members}** adet üye var (**${online}** Aktif)
\`❯\` Toplamda **${Tag}** kişi tagımızı alarak bizi destekliyor.
\`❯\` Toplamda **${boost}** adet boost basılmış! ve Sunucu **${boostlevel}** seviye
`).setAuthor('').setColor('BLACK').setFooter(''))

}}