const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const profileSchema = mongoose.Schema({
  guildId: reqString,
  userId: reqString,
  xp: {
    type: Number,
    default: 0,
  },
  vcxp: {
    type: Number,
    default: 0,
  },
  level: {
    type: Number,
    default: 1,
  },
  vclevel: {
    type: Number,
    default: 1,
  },
})

module.exports = mongoose.model('profiles', profileSchema)