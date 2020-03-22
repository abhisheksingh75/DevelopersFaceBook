const express = require("express")
const path = require("path")
const { check, validationResult } = require("express-validator")
const User = require("../../models/users")
const gravatar = require("gravatar")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("config")

const router = express.Router()
//@POST API
//@DESC Register User
//@ACCESS user
router.post(
  "/",
  [
    check("name")
      .notEmpty()
      .withMessage("Please enter user Name"),
    check("email")
      .isEmail()
      .withMessage("Enter valid email address"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Enter password of atlease 6 characters")
  ],

  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { name, email, password } = req.body

    try {
      //check if user exists
      let user = await User.findOne({ email: email })
      if (user) {
        return res.status(400).json({
          errors: [
            {
              msg: "User already exists"
            }
          ]
        })
      }
      //create avatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm"
      })
      //create user
      user = new User({
        name: name,
        email: email,
        password: password,
        avatar: avatar
      })
      //encryt the password
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)
      await user.save()

      const payload = {
        users: {
          id: user._id
        }
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
