const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const personalSchema = mongoose.Schema({
  userId: reqString,
  greetingEnabled: {
    type: Boolean,
    default: false,
  },
  city: reqString,
  premium: {
    type: Boolean,
    default: false,
  },
})

module.exports = mongoose.model('personal-settings', personalSchema)