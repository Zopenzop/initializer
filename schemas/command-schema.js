const mongoose = require('mongoose')

const commandSchema = mongoose.Schema({
  guildId: {
    type: String,
    required: true,
  },
  command: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
    required: true,
  },
  roles: {
    type: [String],
    required: true,
  },
  channels: {
    type: [String],
    required: true,
  },
})

module.exports = mongoose.model('command', commandSchema)