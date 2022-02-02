const mongoose = require('mongoose')
let mongodb;

module.exports = async (mongoPath) => {
  await mongoose.connect(mongoPath, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  return mongoose
}
