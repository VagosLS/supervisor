
const { MessageEmbed } = require('discord.js')

module.exports = {
conf: {name: 'sesli', aliases: ["sesli-say"], help: "!sesli"},
stg: async(client, message, args, config, embed, nembed, role, logs, perms, other) => {
if(!perms.OwnerPermissions.some(x => message.member.roles.cache.get(x)) && !perms.ManagerPermissions.some(x => message.member.roles.cache.get(x)) && !message.member.hasPermission('ADMINISTRATOR')) return 

let tag = config.Tag;
let enaltyt = message.guild.roles.cache.get(perms.EnaltYT);
let pubID = other.PublicID;

let topses = message.guild.members.cache.filter(s => s.voice.channel);
let tagses = topses.filter(s => s.user.username.includes(tag));
let ytses = topses.filter(s => s.roles.highest.position >= enaltyt.position);
let otherses = topses.size - ytses.size - tagses.size < 1 ? 0 : topses.size - ytses.size - tagses.size;
let pubses = topses.filter(s => s.voice.channel.parentID === pubID);

let yayın = topses.filter(s => s.voice.streaming);
let mik = topses.filter(s => s.voice.selfMute).size;
let kulak = topses.filter(s => s.voice.selfDeaf).size;
let bot = topses.filter(s => s.user.bot);
let count = 1;
let topCategory = message.guild.channels.cache.filter(s => s.type === 'category').sort((a, b) => Number(message.guild.members.cache.filter(s => s.voice.channel && s.voice.channel.parentID === b.id).size - Number(message.guild.members.cache.filter(s => s.voice.channel && s.voice.channel.parentID === a.id).size))).map((c, index) => `${count++}. **#${c.name}**: **${c.members.filter(s => s.voice.channel && s.voice.channel.parentID === c.id).size}**`).splice(0, 3).join('\n');


message.channel.send(embed.setDescription(`
Sesli kanallarda toplam **${topses.size}** üye var !
Public ses kategarosinde toplamda **${pubses.size}** üye bulunuyor !
Ses kanallarında **${otherses || '0'}** normal kullanıcı var !
Ses kanallarında **${tagses.size}** taglı kullanıcı var !
Ses kanallarında **${ytses.size}** yetkili var !
Ses kanallarında **${yayın.size}** üye yayın yapıyor !
Mikrofonu kapalı: **${mik}**
Kulaklığı kapalı: **${kulak}**
Bot: **${bot.size}**

Top 3 kategori sırası;
${topCategory || 'Yok'}`).setColor('BLACK').setFooter(`${message.author.tag} tarafından istendi !`).setTimestamp())


}}