const { Discord, MessageEmbed, Client, Collection } = require('discord.js')
const Penal = require('../Models/Penals')
const role = require('../Settings/Roles.json')
const logs = require('../Settings/Logs.json')
const other = require('../Settings/Other.json')
const settings = require('../config')
module.exports = async (oldUser, newUser) => {
if(oldUser.username == newUser.username || oldUser.bot || newUser.bot) return;
let client = oldUser.client;
let Guild = client.guilds.cache.get(settings.GuildID);
if(!Guild) return;
let user = Guild.members.cache.get(oldUser.id);
if(!user) return;

let embed = new MessageEmbed().setColor('BLACK')
if(newUser.username.includes(settings.Tag) && !user.roles.cache.has(role.TagRole)){
client.channels.cache.get(logs.AutotagLog).send(embed.setDescription(`${other.StgKalp} ${user} adlı üye \`${settings.Tag}\` tagımızı alarak **ailemize katıldı** ! \n (Güncel Taglı Sayımız:  ${Guild.members.cache.filter(x => x.user.username.includes(settings.Tag)).size})`).setColor("BLACK"));
if(role.JailRole && user.roles.cache.has(role.JailRole)) return;
if(role.BannedTagRole && user.roles.cache.has(role.BannedTagRole)) return;
user.roles.add(role.TagRole).catch();
if(user.manageable) user.setNickname(user.displayName.replace(settings.SecondaryTag, settings.Tag))
} else if(!newUser.username.includes(settings.Tag) && user.roles.cache.has(role.TagRole)){
user.setNickname(user.displayName.replace(settings.Tag, settings.SecondaryTag))
let tagRol = Guild.roles.cache.get(role.TagRole);
user.roles.remove(user.roles.cache.filter(rol => tagRol.position <= rol.position));}
client.channels.cache.get(logs.AutotagLog).send(embed.setDescription(`${other.StgAtes} ${user} adlı üye \`${settings.Tag}\` tagımızı saldı ve **rollerini geri aldım** ! \n (Güncel Taglı Sayımız:  ${Guild.members.cache.filter(x => x.user.username.includes(settings.Tag)).size})`).setColor("BLACK"));
}
module.exports.configuration = {name: "userUpdate"}