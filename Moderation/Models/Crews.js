const mongoose = require('mongoose')
const Crews = mongoose.Schema({
GuildID: String,
Crews: {type: Array, default: []},
})
module.exports = mongoose.model("Crews", Crews);