const { MessageEmbed } = require('discord.js')
const Staff = require('../Models/Staffs')

module.exports = {
conf: {name: 'yetkili-stat', aliases: ["yetkili-istatik", "yetkili-kontrol", "yt-stat", "kayıtlar", "kayıtlarım", "statım"], help: "!yetkili-stat"},
stg: async(client, message, args, config, embed, nembed, role, logs, perms, other) => {
if(!perms.OwnerPermissions.some(x => message.member.roles.cache.get(x)) && !perms.ManagerPermissions.some(x => message.member.roles.cache.get(x)) && !perms.AllPenalsPermissions.some(x => message.member.roles.cache.get(x)) && !message.member.hasPermission('ADMINISTRATOR')) return 

const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

if(member) {
Staff.findOne({GuildID: message.guild.id, UserID: member.id}, async(err, data) => {
if(err) return console.log(err)
if(!data) return message.channel.send(embed.setDescription(`${member} yetkilisi hiçbir işlem yapmamış.
en az 1 ceza veya kayıt işlemi yapması gerekiyor.`))
message.channel.send(embed.setDescription(`
${member} adlı üyenin ${message.guild.name} sunucusunda kullandığı tüm işlemleri aşağıya listeledim.

Toplamda **${data.RegisterTotal}** kişiyi sunucumuza kayıt etmiş.
• \`❤️\` Kayıtta **${data.WomanTotal}** kişiye <@&${role.WomanRole}> rolünü vermiş
• \`💙\` Kayıtta **${data.ManTotal}** kişiye <@&${role.ManRole}> rolünü vermiş.

━━━━━━━━━━━━━━━━━━━━━

Toplamda **${data.CommandsTotal}** kişiyi cezalandırmış. 
• \`🔨\` Sunucudan **${data.BanTotal}** kişiyi yasaklamış. 
• \`🚫\` Sunucudaki **${data.JailTotal}** kişiyi hapise göndermiş. 
• \`📝\` Sohbetten **${data.MuteTotal}** kişiyi metin kanallarından engellemiş. 
• \`🔊\` Seslerden **${data.VoiceTotal}** kişiyi sesli kanallardan engellemiş. 
• \`🔔\` Sunucudan **${data.WarnTotal}** kişiyi uyarmış. 


`))})}

if(!member) {
Staff.findOne({GuildID: message.guild.id, UserID: message.author.id}, async(err, data) => {
if(err) return console.log(err)
if(!data) return message.channel.send(embed.setDescription(`
Hiçbir işlem yapmamışsınız.
en az 1 ceza veya kayıt işlemi yapmanız gerekiyor.`))
message.channel.send(embed.setDescription(`
${message.author} adlı üyenin ${message.guild.name} sunucusunda kullandığı tüm işlemleri aşağıya listeledim.

Toplamda **${data.RegisterTotal}** kişiyi sunucumuza kayıt etmiş.
• \`❤️\` Kayıtta **${data.WomanTotal}** kişiye <@&${role.WomanRole}> rolünü vermiş
• \`💙\` Kayıtta **${data.ManTotal}** kişiye <@&${role.ManRole}> rolünü vermiş.

━━━━━━━━━━━━━━━━━━━━━

Toplamda **${data.CommandsTotal}** kişiyi cezalandırmış. 
• \`🔨\` Sunucudan **${data.BanTotal}** kişiyi yasaklamış. 
• \`🚫\` Sunucudaki **${data.JailTotal}** kişiyi hapise göndermiş. 
• \`📝\` Sohbetten **${data.MuteTotal}** kişiyi metin kanallarından engellemiş. 
• \`🔊\` Seslerden **${data.VoiceTotal}** kişiyi sesli kanallardan engellemiş. 
• \`🔔\` Sunucudan **${data.WarnTotal}** kişiyi uyarmış. 

`))})}

}}