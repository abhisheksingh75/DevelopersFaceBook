const express = require("express")

const router = express.Router()

//@GET API
//@DESC PROFILE
//@ACCESS PUBLIC
router.get("/", (req, res) => {
  res.send("Profile API")
})
module.exports = router
