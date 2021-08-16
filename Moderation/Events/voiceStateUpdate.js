const { Discord, MessageEmbed, Client, Collection, Message } = require('discord.js')
const role = require('../Settings/Roles.json')
const logs = require('../Settings/Logs.json')
const other = require('../Settings/Other.json')
const settings = require('../config')
module.exports = async (oldState, newState) => {
let embed = new MessageEmbed().setColor('GREEN').setFooter(settings.Footer)

//Sese Girme
if (!oldState.channelID && newState.channelID) return newState.guild.channels.cache.get(logs.SoundsLog).send(embed.setAuthor(`Sese Girdi !`).setDescription(`
**${newState.guild.members.cache.get(newState.id).user.tag}** adlı üye \`${newState.guild.channels.cache.get(newState.channelID).name}\` adlı sesli kanala girdi !`));
//Sesten Çıkma
if (oldState.channelID && !newState.channelID) return newState.guild.channels.cache.get(logs.SoundsLog).send(embed.setAuthor('Sesten Çıktı !').setDescription(`
**${newState.guild.members.cache.get(newState.id).user.tag}** adlı üye \`${newState.guild.channels.cache.get(oldState.channelID).name}\` adlı sesli kanaldan ayrıldı !`).setColor('RED'));
//Ses Değiştirme
if (oldState.channelID && newState.channelID && oldState.channelID != newState.channelID) return newState.guild.channels.cache.get(logs.SoundsLog).send(embed.setAuthor('Ses Kanalı Değiştirdi !').setDescription(`
**${newState.guild.members.cache.get(newState.id).user.tag}** adlı üye ses kanalını değiştirdi ! | \`${newState.guild.channels.cache.get(oldState.channelID).name}\` => \`${newState.guild.channels.cache.get(newState.channelID).name}\``).setColor('YELLOW'));
//Self Mute Kaldırma
if (oldState.channelID && oldState.selfMute && !newState.selfMute) return newState.guild.channels.cache.get(logs.SoundsLog).send(embed.setAuthor('Kendi Susturmasını Kaldırdı !').setDescription(`
**${newState.guild.members.cache.get(newState.id).user.tag}** adlı üye \`${newState.guild.channels.cache.get(newState.channelID).name}\` adlı sesli kanalda kendi susturmasını kaldırdı !`).setColor('#3158bb'));
//Self Mute Atma
if (oldState.channelID && !oldState.selfMute && newState.selfMute) return newState.guild.channels.cache.get(logs.SoundsLog).send(embed.setAuthor('Kendini Susturdu !').setDescription(`
**${newState.guild.members.cache.get(newState.id).user.tag}** adlı üye \`${newState.guild.channels.cache.get(newState.channelID).name}\` adlı sesli kanalda kendini susturdu !`).setColor('#bb318f'));
//Self Sağırlaştırma Kaldırma
if (oldState.channelID && oldState.selfDeaf && !newState.selfDeaf) return newState.guild.channels.cache.get(logs.SoundsLog).send(embed.setAuthor('Kendi Sağırlaştırmasını Açtı !').setDescription(`
**${newState.guild.members.cache.get(newState.id).user.tag}** adlı üye \`${newState.guild.channels.cache.get(newState.channelID).name}\` adlı sesli kanalda kendi sağırlaştırmasını kaldırdı !`).setColor('#3df5b4'));
//Self Sağırlaştırma Atma
if (oldState.channelID && !oldState.selfDeaf && newState.selfDeaf) return newState.guild.channels.cache.get(logs.SoundsLog).send(embed.setAuthor('Kendini Sağırlaştırdı !').setDescription(`
**${newState.guild.members.cache.get(newState.id).user.tag}** adlı üye \`${newState.guild.channels.cache.get(newState.channelID).name}\` adlı sesli kanalda kendini sağırlaştırdı !`).setColor('#34afb8'));

}
module.exports.configuration = {name: "voiceStateUpdate"}