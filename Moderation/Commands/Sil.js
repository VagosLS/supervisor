const { MessageEmbed } = require('discord.js');

module.exports = {
conf: {name: 'sil', aliases: ["temizle"], help: "!sil @Striga"},
stg: async(client, message, args, config, embed, nembed, role, logs, perms, other) => {
if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(nembed.setAuthor(message.guild.name, message.guild.iconURL({dynamic:true})).setDescription("Bu komutu kullanabilmek için **Mesajları Yönet** iznine sahip olmalısın!")).then(x => x.delete({timeout:6500}))
if(!args[0] || (args[0] && isNaN(args[0])) || Number(args[0]) < 1 || Number(args[0]) > 100) return message.channel.send(embed.setDescription("1-100 arasında silinecek mesaj miktarı belirtmelisin!")).then(x => x.delete({timeout:6500}))
await message.delete().catch();
message.channel.bulkDelete(Number(args[0])).then(msjlar => message.channel.send(embed.setDescription(`Başarıyla **${msjlar.size}** adet mesaj silindi!`)).then(x => x.delete({timeout: 5000}))).catch()
}}