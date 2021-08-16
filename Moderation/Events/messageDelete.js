const { Discord, MessageEmbed, Client, Collection } = require('discord.js')
const Snipe = require('../Models/Snipe')
const role = require('../Settings/Roles.json')
const logs = require('../Settings/Logs.json')
const other = require('../Settings/Other.json')
const settings = require('../config')
module.exports = async (message) => {
const moment = require('moment'); 
let client = message.client;
if (message.channel.type === "dm" || !message.guild || message.author.bot) return;
   
let SData = await Snipe.findOne({ GuildID: message.guild.id })
if(!SData) {
let newData = new Snipe({
GuildID: message.guild.id,
UserID: message.author.id,
ChannelID: message.channel.id,
deletedDate: Date.now(),
createdDate: message.createdTimestamp,
messageContent: message.content}).save().catch(e => { }) 
} else {
SData.UserID = message.author.id; 
SData.ChannelID = message.channel.id;
SData.deletedDate = Date.now(),
SData.createdDate = message.createdTimestamp,
SData.messageContent= message.content
SData.save().catch(e => { })
}


};
module.exports.configuration = {name: "messageDelete"}