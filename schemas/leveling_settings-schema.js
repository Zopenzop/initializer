const mongoose = require('mongoose')

const levelingsettingsSchema = mongoose.Schema({
  guildId: {
    type: String,
    required: true,
  },
  blacklist: {
    channels: {
          type: Array,
    required: true,
    },
    roles: {
          type: Array,
    required: true,
    },
    users: {
          type: Array,
    required: true,
    }
  }
  rewards: {
    type: [Object],
    required: true,
  },
})

module.exports = mongoose.model('leveling-settings', levelingsettingsSchema)