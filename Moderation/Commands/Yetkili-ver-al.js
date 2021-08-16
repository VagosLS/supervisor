const { MessageEmbed } = require('discord.js');

module.exports = {
conf: {name: 'yetki', aliases: ["yt"], help: "!yetki al"},
stg: async(client, message, args, config, embed, nembed, role, logs, perms, other) => {
if(!perms.OwnerPermissions.some(x => message.member.roles.cache.get(x)) && !perms.ManagerPermissions.some(x => message.member.roles.cache.get(x)) && !perms.RoleManagerPermissions.some(x => message.member.roles.cache.get(x)) && !message.member.hasPermission('ADMINISTRATOR')) return 

let belirt = args[0]


let Baslangic1 = "869259366933598283"
let Baslangic2 = "869259366933598279"
 


if(belirt === "ver") {
const member = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
if(!member.user.username.includes(config.tag)) return message.channel.send(nembed.setDescription(`Belirtilen üye taglı değil`))
if(!member) return message.channel.send(nembed.setDescription(`Bir üye belirtin ve tekrar deneyin.`))
message.channel.send(embed.setDescription(`${member} adlı üye artık ${Baslangic1} yetkisine sahip`))
member.roles.add(Baslangic1)
member.roles.add(Baslangic2)
}



}}