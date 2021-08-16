const mongoose = require("mongoose");

const Snipe = mongoose.Schema({
  GuildID: { type: String, default: "" },
  UserID: { type: String, default: "" },
  ChannelID: { type: String, default: "" },
  messageContent: { type: String, default: "" },
  Image: { type: String, default: "" },
  createdDate: { type: Number, default: Date.now() },
  deletedDate: { type: Number, default: Date.now() }
});

module.exports = mongoose.model("Snipe", Snipe);
