const mongoose = require('mongoose')

const statscountersSchema = mongoose.Schema({
  guildId: {
    type: String,
    required: true,
  },
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
})

module.exports = mongoose.model('stats_counters', statscountersSchema)