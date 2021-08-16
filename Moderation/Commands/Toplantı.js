const { MessageEmbed } = require("discord.js");

module.exports = {
conf: {name: 'toplantı', aliases: ["katıldı", "yoklama"], help: "!toplantı @Striga/ID"},
stg: async(client, message, args, config, embed, nembed, role, logs, perms, other, points) => {
if(!perms.OwnerPermissions.some(x => message.member.roles.cache.get(x)) && !message.member.hasPermission('ADMINISTRATOR')) return 
if(!message.member.voice || message.member.voice.channelID != other.ToplantıOdası) return;
  
let members = message.guild.members.cache.filter(member => member.roles.cache.has(role.JoinedRole) && member.voice.channelID != other.ToplantıOdası);
members.array().forEach((member, index) => {
setTimeout(() => {
member.roles.remove(role.JoinedRole).catch();
}, index * 1250)
});
let seste = message.member.voice.channel.members.filter(member => member.voice.channelID === other.ToplantıOdası)
let verildi = message.member.voice.channel.members.filter(member => !member.roles.cache.has(role.JoinedRole) && !member.user.bot)
verildi.array().forEach((member, index) => {
setTimeout(() => {
member.roles.add(role.JoinedRole).catch();
}, index * 1250)});
message.channel.send(embed.setDescription(`<#${other.ToplantıOdası}> odasında bulunan insanlara <@&${role.JoinedRole}> rolünü dağıtmaya başladım.
Toplanımızda toplamda **${seste.size}** kişi bulunmaktadır.

• Katılan **${verildi.size}** kişiye katıldı rolü verdim.
• Katılmayan **${members.size}** kişiden katıldı rolünü aldım.

`)).catch();
}};