const mongoose = require('mongoose')

const serversettingsSchema = mongoose.Schema({
  guildId: {
    type: String,
    required: true,
  },
  premium: {
    type: Boolean,
    required: true,
    default: false,
  },
  staff: {
    role: {
      type: String,
      default: "",
    },
    channel: {
      type: String,
      default: "",
    }
  },
  /*counters: {
  totalmembers: {
    type: String,
    required: true,
  },
  humans: {
    type: String,
    required: true,
  },
  online: {
    type: String,
    required: true,
  },
  bots: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  },*/
  suggestionChannel: {
    type: String,
    required: true,
  },
  reportChannel: {
    type: String,
    required: true,
  },
  levelblacklist: {
    type: Array,
    required: true,
  },
  levelrewards: {
    type: [Object],
    required: true,
  },
  levelbg: {
    type: String,
    required: true,
  },
  levelbgy: {
    type: Number,
    required: true,
  },
  lbbg: {
    type: String,
    required: true,
  },
  custcmd: {
    type: [String],
    required: true,
  },
  custcmdaction: {
    type: [String],
    required: true,
  },
})

module.exports = mongoose.model('server-settings', serversettingsSchema)