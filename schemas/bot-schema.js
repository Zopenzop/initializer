const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const botSchema = mongoose.Schema({
  defaultPrefix: reqString,
  devs: [String],
})

module.exports = mongoose.model('bot-info', botSchema)