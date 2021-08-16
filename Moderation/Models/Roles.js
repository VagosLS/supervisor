const mongoose = require("mongoose");

const Roles = mongoose.Schema({
  GuildID: String,
  UserID: String,
  RoleBase: { type: Array, default: [] }
});

module.exports = mongoose.model("Roles", Roles);