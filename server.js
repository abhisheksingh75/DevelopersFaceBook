const express = require("express")
const dbConnect = require("./config/dbconfig.js")
const path = require("path")
const app = express()

const PORT = process.env.PORT || 5000
dbConnect()

//define body parser
app.use(express.json({ extended: false }))
//Define Routs
app.use("/api/auth", require("./routers/api/auth"))
app.use("/api/user", require("./routers/api/user"))
app.use("/api/post", require("./routers/api/post"))
app.use("/api/profile", require("./routers/api/profile"))

//server static assesets
if (process.env.NODE_ENV == "production") {
  //set static folder
  app.use(express.static("client/build"))
  app.use("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  })
}

app.listen(5000, () => {
  console.log("server listing on port" + PORT)
})
