const express = require("express")

const router = express.Router()

//@GET API
//@DESC POST
//@ACCESS PUBLIC
router.get("/", (req, res) => {
  res.send("POST API")
})

module.exports = router
