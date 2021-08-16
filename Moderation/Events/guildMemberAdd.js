const { Discord, MessageEmbed, Client, Collection } = require('discord.js')
const Penal = require('../Models/Penals')
const role = require('../Settings/Roles.json')
const settings = require('../config')

module.exports = async (member) => {

const guild = client.guilds.cache.get(settings.GuildID);
const activePenals = await Penal.find({ GuildID: guild.id, Active: true });
activePenals.forEach(async (x) => {
const member = guild.members.cache.get(x.UserID);
if (!member) return;
if (x.Type === client.Types.Mute && !member.roles.cache.has(role.MuteRole)) return member.roles.add(role.MuteRole);
if ((x.Type === client.Types.Jail || x.Type === client.Types.PermaJail || x.Type === client.Types.Reklam) && !member.roles.cache.has(role.JailRole)) return await member.roles.set(member.roles.cache.has(role.BoosterRole) ? [role.BoosterRole, role.JailRole] : [role.JailRole]).catch();
if (x.Type === client.Types.VoiceMute) {
if (!member.roles.cache.has(role.VoiceMuteRole)) member.roles.add(role.VoiceMuteRole);
if (member.voice.channelID && !member.voice.serverMute) member.voice.setMute(true);
}});
}
module.exports.configuration = {name: "guildMemberAdd"}
