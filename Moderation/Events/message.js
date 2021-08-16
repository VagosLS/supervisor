const { Discord, MessageEmbed, Client, Collection } = require('discord.js')
const logs = require('../Settings/Logs.json')
const perms = require('../Settings/Permissions.json')
const role = require('../Settings/Roles.json')
const other = require('../Settings/Other.json')
const points = require('../Settings/PenalSettings.json')
const settings = require('../config')
module.exports = async(message) => {

const embed = new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({dynamic:true})).setColor(client.generalColor()).setFooter(settings.Footer)
const nembed = new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({dynamic:true})).setColor(client.warnColor()).setFooter(settings.Footer) 

if([".tag","!tag"].includes(message.content.toLowerCase())){ return message.channel.send("`"+settings.Tag+"`")}

if (!message.guild || message.author.bot || message.channel.type === 'dm') return;
let prefix = settings.Prefix.filter(p => message.content.startsWith(p))[0]; 
if (!prefix) return;
let config = settings;
let args = message.content.split(' ').slice(1);
let command = message.content.split(' ')[0].slice(prefix.length); 
let stg = client.commands.get(command) || client.commands.get(client.aliases.get(command));
if (stg){
stg.stg(client, message, args, config, embed, nembed, role, logs, perms, other, points);
client.channels.cache.get(logs.CommandLog).send(embed.setColor("RANDOM").setTimestamp().setAuthor(message.author.tag, message.author.avatarURL()).setDescription(`
\`❯\` Kullanıcı: ${message.author.tag} - (${message.author.id}) 
\`❯\` Komut: !${stg.conf.name}
\`❯\` Kanal: ${message.channel.name} - (<#${message.channel.id}>)`))
}
}
module.exports.configuration = {name: "message"}