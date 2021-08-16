const { Discord, MessageEmbed, Client, Collection } = require('discord.js')
const Penal = require('../Models/Penals')
const role = require('../Settings/Roles.json')
const settings = require('../config')
module.exports = () => {
client.user.setPresence({ active: { name: settings.ServerMessage }, status: settings.ServerCase });
if (settings.VoiceID && client.channels.cache.has(settings.VoiceID)) client.channels.cache.get(settings.VoiceID).join().catch();


setInterval(async () => {
const guild = client.guilds.cache.get(settings.GuildID);
if (!guild) return;
const finishedPenals = await Penal.find({ GuildID: guild.id, Active: true, FinishDate: { $lte: Date.now() } });
finishedPenals.forEach(async (x) => {
const member = guild.members.cache.get(x.UserID);
if (!member) return;
if (x.Type === client.Types.Mute) {
x.Active = false;
x.save();
await member.roles.remove(role.MuteRole)
}
if (x.Type === client.Types.VoiceMute) {
x.Active = false;
x.save();
if (member.voice.serverMute) member.voice.setMute(false);
await member.roles.remove(role.VoiceMuteRole)
}
if (x.Type === client.Types.Jail) {
x.Active = false;
x.save();
await member.roles.add(role.UnregisterRole)
await member.roles.remove(role.JailRole)
}
});

const activePenals = await Penal.find({ GuildID: guild.id, Active: true });
activePenals.forEach(async (x) => {
const member = guild.members.cache.get(x.UserID);
if (!member) return;
let digerroller = [];
member.roles.cache.filter(r => r.id).map(r => {digerroller.push(r.id)})
if (x.Type === client.Types.Mute && !member.roles.cache.has(role.MuteRole)) return member.roles.add(role.MuteRole);
if ((x.Type === client.Types.Jail || x.Type === client.Types.PermaJail || x.Type === client.Types.Reklam) && !member.roles.cache.has(role.JailRole) || member.roles.cache.has(role.ManRole) || member.roles.cache.has(role.WomanRole) || member.roles.cache.has(role.UnregisterRole)) return member.roles.set(member.roles.cache.has(role.BoosterRole) ? [role.BoosterRole, role.JailRole] : [role.JailRole]).catch();
if (x.Type === client.Types.VoiceMute) {
if (!member.roles.cache.has(role.VoiceMuteRole)) member.roles.add(role.VoiceMuteRole);
if (member.voice.channelID && !member.voice.serverMute) member.voice.setMute(true);
}});
}, 1000 * 5);

};
module.exports.configuration = {name: "ready"}