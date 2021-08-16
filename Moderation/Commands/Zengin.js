const { MessageEmbed } = require('discord.js')

module.exports = {
conf: {name: 'booster', aliases: ["zengin", "bisim"], help: "!booster isim"},
stg: async(client, message, args, config, embed, nembed, role, logs, perms, other) => {
if(!message.member.roles.cache.get(role.BoosterRole)) return
let member = message.member; 
const Name = args.slice(0).filter(arg => isNaN(arg)).map(arg => arg[0].toUpperCase() + arg.slice(1).toLowerCase()).join(" ");
if(!Name) return message.channel.send(nembed.setDescription(`Bir isim yaz ve tekrar dene.`))
if(await client.NameGuard(Name)) return message.channel.send(nembed.setDescription(`Lütfen üyenin isminde küfür veya reklam içeren bir isim yazmayın.`))
if(Name.length > 30) return message.channel.send(nembed.setDescription(`Lütfen üyenin ismini 30 karakteri geçmiyecek şekilde belirtin.`))
const GuildName = `${member.user.username.includes(config.Tag) ? config.Tag : config.SecondaryTag} ${Name}`;
message.member.setNickname(`${GuildName}`)
message.channel.send(embed.setDescription(`İsminiz başarıyla **${GuildName}** ile değiştirildi`))
}}