const mongoose = require('mongoose')
const Penals = mongoose.Schema({
GuildID: String,
ID: Number,
UserID: String,
Active: { type: Boolean, default: true },
Admin: String,
MemberRoles: Array,
Type: String,
Time: String,
Reason: String,
Date: String,
FinishDate: String,
Finisher: String,
Warns: String
})
module.exports = mongoose.model("Penals", Penals);