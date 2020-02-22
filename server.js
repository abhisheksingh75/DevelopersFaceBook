const express = require("express")
const dbConnect = require("./config/dbconfig.js")
const app = express()

const PORT = process.env.PORT || 5000
dbConnect()

app.get("/", (req, res) => {
  res.send("API Running")
})

app.listen(5000, () => {
  console.log("server listing on port" + PORT)
})
