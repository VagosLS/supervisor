const { MessageEmbed } = require('discord.js');

module.exports = {
conf: {name: 'yetkili-say', aliases: ["yt-say", "yetkili-kontrol"], help: "!yetkili-say"},
stg: async(client, message, args, config, embed, nembed, role, logs, perms, other) => {
if(!perms.OwnerPermissions.some(x => message.member.roles.cache.get(x)) && !perms.ManagerPermissions.some(x => message.member.roles.cache.get(x)) && !message.member.hasPermission('ADMINISTRATOR')) return 
let roles = message.guild.roles.cache.get(perms.EnaltYT);
let üyeler = message.guild.members.cache.filter(uye => !uye.user.bot && uye.roles.highest.position >= roles.position && uye.presence.status !== "offline" && !uye.voice.channel).array();
 var filter = m => m.author.id === message.author.id && m.author.id !== client.user.id && !m.author.bot;
 if(üyeler.length == 0) return

message.channel.send(`Seste olmayan **Çevirimiçi** yetkililerin listesi ve sayısı: ${üyeler.length ?? 0} ${other.Onayla}`)
message.channel.send(`\`\`\` `+ üyeler.map(x => "<@" + x.id + ">").join(",") + `\`\`\``)

}}