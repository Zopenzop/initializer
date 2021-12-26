const mongoose = require('mongoose')

const joinSchema = mongoose.Schema({
  guildId: {
    type: String,
    required: true,
  },
  joinMsg: {
    message: {
      text: {
        type: String,
        default: '{user.mention}'      
      },
      title: {
        type: String,
        default: 'Welcome {user.username}#{user.tag}'
      },
      description: {
        type: String,
        default: 'Have a great time here!'
      }
    },
    channel: {
      type: String,
    },
    enabled: {
      type: Boolean,
      default: false,
    }
  },
  dmJoinMsg: {
    message: {
      text: {
        type: String,
        default: ''      
      },
      title: {
        type: String,
        default: 'Welcome to **{server.name}**'
      },
      description: {
        type: String,
        default: 'Have a great time!'
      }
    },
    enabled: {
      type: Boolean,
      default: false,
    }
  },
})

module.exports = mongoose.model('join', joinSchema)