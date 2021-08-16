const mongoose = require('mongoose')
const Counters = mongoose.Schema({
GuildID: String,
ID: Number,
UserID: String,
PenalPoint: { type: Number, default: 0}
})
module.exports = mongoose.model("Counters", Counters);