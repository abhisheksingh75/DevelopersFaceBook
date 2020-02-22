const express = require("express")

const router = express.Router()

//@GET API
//@DESC TEST
//@ACCESS PUBLIC
router.get("/", (req, res) => {
  res.send("Auth API")
})
module.exports = router
