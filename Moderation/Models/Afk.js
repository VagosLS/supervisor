const mongoose = require('mongoose')
const Afk = mongoose.Schema({
  GuildID: { type: String, default: "" },
  UserID: { type: String, default: "" },
  reason: { type: String, default: "" },
  date: { type: Number, default: Date.now() }
});
module.exports = mongoose.model("Afk", Afk);