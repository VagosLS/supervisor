const mongoose = require('mongoose')
const Staffs = mongoose.Schema({
GuildID: String,    
UserID: String,
MentionID: String,

CommandsTotal: { type: Number, default: 0},
RegisterTotal: { type: Number, default: 0},
ManTotal: { type: Number, default: 0},
WomanTotal: { type: Number, default: 0},

BanTotal: { type: Number, default: 0},
JailTotal: { type: Number, default: 0},
MuteTotal: { type: Number, default: 0},
VoiceTotal: { type: Number, default: 0},
WarnTotal: { type: Number, default: 0},

})
module.exports = mongoose.model("Staffs", Staffs);
