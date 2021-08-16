const { MessageEmbed } = require('discord.js')
const moment = require('moment')
const ms = require('ms')
const Staff = require('../Models/Staffs')
const Penal = require('../Models/Penals')
moment.locale('tr')
module.exports = {
conf: {name: 'banlist', aliases: ["ban-list", "ban-liste", "banlılar"], help: "!ban-list"},
stg: async(client, message, args, config, embed, nembed, role, logs, perms, other) => {
if(!perms.OwnerPermissions.some(x => message.member.roles.cache.get(x)) && !perms.ManagerPermissions.some(x => message.member.roles.cache.get(x)) && !message.member.hasPermission('ADMINISTRATOR')) return 

message.guild.fetchBans(true).then(banned => {
let list = banned.map(user => `${user.user.id} | ${user.user.tag}`).join('\n');
message.channel.send(`${message.guild.name} toplamda ${banned.size} kullanıcı yasaklı bulunmakta.`)
message.channel.send(`${list}`, { code: "xl", split: true })
})

}}
