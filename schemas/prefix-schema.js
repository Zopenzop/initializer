const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const prefixSchema = mongoose.Schema({
  guildId: reqString,
  prefix: reqString,
})

//prefixSchema.index({guildId: "text"})

module.exports = mongoose.model('prefixes', prefixSchema)