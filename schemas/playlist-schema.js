const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const playlistSchema = mongoose.Schema({
  userId: reqString,
  code: reqString,
  songs: [reqString],
  type: reqString,
  upvotes: Number,
  downvotes: Number,
})

module.exports = mongoose.model('playlists', playlistSchema)