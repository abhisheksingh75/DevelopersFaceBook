const mongoose = require("mongoose")
const config = require("config")
const dbURL = config.get("MongoURL")

const dbConnect = async () => {
  try {
    console.log("MongoDB connecting....")
    await mongoose.connect(dbURL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    console.log("MongoDB connected....")
  } catch (err) {
    console.log(err.message)
  }
}

module.exports = dbConnect
