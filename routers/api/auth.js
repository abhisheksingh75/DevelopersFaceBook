const express = require("express")
const auth = require("../../middleware/auth")
const User = require("../../models/users")
const { check, validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("config")

const router = express.Router()

//@GET API
//@DESC TEST
//@ACCESS PUBLIC
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById({ _id: req.user.id })
      .select("-password")
      .catch((err) => console.log("caught it"))
    return res.json(user)
  } catch (err) {
    console.log(err.message)
    res.status(500).send("server Error")
  }
})

//@POST API
//@DESC login User
//@ACCESS Public
router.post(
  "/",
  [
    check("email")
      .isEmail()
      .withMessage("Enter valid email address"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Enter password of atlease 6 characters"),
  ],

  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body

    try {
      let user = await User.findOne({ email: email })

      //check if user exists
      if (!user) {
        return res.status(400).json({
          errors: [
            {
              msg: "Invalid user",
            },
          ],
        })
      }
      //check the password
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.status(400).json({
          errors: [
            {
              msg: "Invalid Credentials",
            },
          ],
        })
      }

      const payload = {
        users: {
          id: user._id,
        },
      }

      jwt.sign(
        payload,
        config.get("jwtToken"),
        { expiresIn: 3600000 },
        (err, token) => {
          if (err) {
            throw err
          } else {
            res.json({ token })
          }
        }
      )
    } catch (err) {
      console.log("server errror " + err.message)
      res.status(500).send("server error")
    }
  }
)
module.exports = router
