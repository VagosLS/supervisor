const { MessageEmbed, GuildMemberManager } = require('discord.js')
const moment = require('moment')
const ms = require('ms')
const Staff = require('../Models/Staffs')
const Penal = require('../Models/Penals')

module.exports = {
conf: {name: 'unban', aliases: ["ban-bitir", "banbitir"], help: "!unban @Striga/ID sebep"},
stg: async(client, message, args, config, embed, nembed, role, logs, perms, other) => {
if(!message.member.roles.cache.get(perms.JailPermissions) && !perms.OwnerPermissions.some(x => message.member.roles.cache.get(x)) && !perms.ManagerPermissions.some(x => message.member.roles.cache.get(x)) && !perms.AllPenalsPermissions.some(x => message.member.roles.cache.get(x)) && !message.member.hasPermission('ADMINISTRATOR')) return 

const member = await client.fetchBan(message.guild, args[0]);
const sebep = args.splice(1).join(" ") || "AF ("+ message.author.id+")"
if(!args[0]) return message.channel.send(nembed.setDescription(`Üyenin ID numarasını belirt ve tekrardan dene.`))
if(!member) return message.channel.send(nembed.setDescription(`Belirtilen üye sunucudan yasaklı değil.`)) 

message.guild.members.unban(args[0]).catch(message.channel.send(`\`${member.user.tag}\` isimli kullanıcının yasağı ${message.author} tarafından kaldırıldı.`)).catch(() => {});
let data = await Penal.findOne({UserID: member.user.id, Type: client.Types.Ban, Active: true})
if(data) {
data.Active = false
data.FinishDate = Date.now()
data.Finisher = message.author.id
data.save();
}

client.channels.cache.get(logs.UnBanLog).send(embed.setDescription(`
${member.user.tag} adlı üye ${message.author} tarafından "**${sebep}**" gerekçesiyle sunucudan yasağı kaldırıldı. 

\`❯\` Kullanıcı: **${member.user.tag}** | \`${member.user.id}\`
\`❯\` Yetkili: ${message.author} | \`${message.author.id}\`
\`❯\` Sebep: **\`${sebep}\`**
\`❯\` Kanal: **\`${message.channel.name}\`** (<#${message.channel.id}>)
━━━━━━━━━━━━━━━━━━━
\`❯\` Tarih: ${moment(+Date.now()).format("LLL")}
`).setColor('#44125a'))


}}
