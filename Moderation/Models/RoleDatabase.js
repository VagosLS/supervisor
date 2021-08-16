const mongoose = require("mongoose");

const Roles = mongoose.Schema({
  GuildID: String,
  UserID: String,
  RoleData: { type: Array, default: [] }
});

module.exports = mongoose.model("Roles", Roles);