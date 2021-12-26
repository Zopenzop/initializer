const mongoose = require('mongoose')

const leaveSchema = mongoose.Schema({
  guildId: {
    type: String,
    required: true,
  },
  leaveMsg: {
    message: {
      text: {
        type: String,
        default: ''      
      },
      title: {
        type: String,
        default: 'Farewell {user.username}#{user.tag}'
      },
      description: {
        type: String,
        default: 'See ya around!'
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
  dmLeaveMsg: {
    message: {
      text: {
        type: String,
        default: ''      
      },
      title: {
        type: String,
        default: '**{server.name}** bids you farewell'
      },
      description: {
        type: String,
        default: 'See ya around!'
      }
    },
    enabled: {
      type: Boolean,
      default: false,
    }
  },
})

module.exports = mongoose.model('leave', leaveSchema)