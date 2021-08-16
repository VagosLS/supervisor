const { MessageEmbed } = require('discord.js');
const settings = require('../config')
module.exports = {
conf: {name: 'taglı', aliases: ["taglılar"], help: "!taglı"},
stg: async(client, message, args, config, embed, nembed, role, logs, perms, other) => {
if(!message.member.hasPermission('ADMINISTRATOR')) return;

message.channel.send(embed.setDescription(`Sunucumuzda toplam ${message.guild.members.cache.filter(x => x.user.username.includes(settings.Tag)).size} kişide tag var.\nSunucuda tag kontrolü yapılıyor.`))
let tagRol = message.guild.roles.cache.get(role.TagRole);
message.guild.members.cache.forEach(x => {
if (x.user.username.includes(settings.Tag)) 
{
x.setNickname(x.displayName.replace(settings.SecondaryTag, settings.Tag))
x.roles.add(role.TagRole)
} else if (!x.user.username.includes(settings.Tag) && x.roles.cache.has(role.TagRole)) {
x.setNickname(x.displayName.replace(settings.Tag, settings.SecondaryTag))
x.roles.remove(x.roles.cache.filter(rol => tagRol.position <= rol.position));
}})



}}
