const mongoose = require('mongoose')
const Extra = mongoose.Schema({
GuildID: String,
UserID: String,

İhlalEdilen: String,
İhlalSebep: String,
İhlal: String,

İzinliUye: String,
İzinliYetkili: String,
İzinliSebep: String,
İzinliSure: String,
İzinliTarih: String,
İzinBitis: String,
İzinBitiren: String,
İzinType: String,
İzinli: { type: Boolean, default: true },
})
module.exports = mongoose.model("Extra", Extra);