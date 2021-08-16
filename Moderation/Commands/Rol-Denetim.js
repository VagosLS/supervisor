const { MessageEmbed } = require('discord.js');

module.exports = {
conf: {name: 'rol-denetim', aliases: ["rol-denetle", "rol-bilgi"], help: "Rol bilgisi"},
stg: async(client, message, args, config, embed, nembed, role, logs, perms, other) => {
if(!perms.OwnerPermissions.some(x => message.member.roles.cache.get(x)) && !perms.ManagerPermissions.some(x => message.member.roles.cache.get(x)) && !message.member.hasPermission('ADMINISTRATOR')) return 

let rolex = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
if(!rolex) return message.channel.send(nembed.setDescription(`Lütfen geçerli bir rol belirtin.`))
let members = rolex.members.array();
let sesteOlmayanlar = members.filter(member => !member.voice.channelID);  
let sesteOlanlar = members.filter(member => member.voice.channel);

message.channel.send(embed.setDescription(`
\`❯\` <@&${rolex.id}> rolünde ${rolex.members.size} kişi bulunmakta. ${other.Onayla}

Bu rolden ${sesteOlanlar.length} kişi seste sohbet ediyor. 
Bu rolden ${sesteOlmayanlar.length} kişi seste değil. ${other.Reddet}`))

message.channel.send(`İşte Seste Olanlar;\n\`\`\`${sesteOlanlar}\`\`\``).catch(strgwszdwxdasdwosojfdklwe => {
let sesteOlanlardosya = new MessageAttachment(Buffer.from(sesteOlanlar.slice().join(`\n`)), `${rolex.id}-sesteolanlar.txt`);
message.channel.send(`Seste olan kullanıcıların sayısı Discord'un izin verdiği Api sayısını geçtiğinden dolayı metin belgesi olarak atıyorum.`, sesteOlanlardosya)
})

message.channel.send(`İşte Seste Olmayanlar;\n\`\`\`${sesteOlmayanlar}\`\`\``).catch(strgwszdwxdasdwosojfdklwe => {
let sesteOlmayanlardosya = new MessageAttachment(Buffer.from(sesteOlmayanlar.slice().join(`\n`)), `${rolex.id}-sesteolmayanlar.txt`);
message.channel.send(`Seste olan kullanıcıların sayısı Discord'un izin verdiği Api sayısını geçtiğinden dolayı metin belgesi olarak atıyorum.`, sesteOlmayanlardosya)
})

}}