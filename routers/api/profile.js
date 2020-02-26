const express = require("express")
const auth = require("../../middleware/auth")
const User = require("../../models/users")
const Profile = require("../../models/profile")
const { check, validationResult } = require("express-validator")

const router = express.Router()

//@GET API/profile/me
//@DESC get current user profile
//@ACCESS PRIVATE
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate("user", ["name", "avatar"])

    if (!profile) {
      res.status(400).json({ msg: "There is no profile for the user" })
    }
    res.json(profile)
  } catch (err) {
    console.log(err.message)
    res.status(500).send("Server Error")
  }
  res.send("Profile API")
})

//@GET API/profile
//@DESC Create or Update Profile
//@ACCESS PRIVATE
router.post(
  "/",
  [
    auth,
    [
      check("status")
        .notEmpty()
        .withMessage("Status is required"),
      check("skills")
        .notEmpty()
        .withMessage("skills is requried")
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400).send({ errors: errors.array() })
    }
    const {
      company,
      website,
      location,
      status,
      skills,
      bio,
      githubusername,
      youtube,
      twitter,
      facebook,
      linkedin,
      instagram
    } = req.body

    //build profile objects
    const profileFields = {}
    profileFields.user = req.user.id
    if (company) profileFields.company = company
    if (website) profileFields.website = website
    if (location) profileFields.location = location
    if (status) profileFields.status = status
    if (bio) profileFields.bio = bio
    if (githubusername) profileFields.githubusername = githubusername
    profileFields.skills = skills.split(",").map(skill => {
      return skill.trim()
    })
    //Build social object
    profileFields.social = {}
    if (youtube) profileFields.social.youtube = youtube
    if (twitter) profileFields.social.twitter = twitter
    if (facebook) profileFields.social.facebook = facebook
    if (linkedin) profileFields.social.linkedin = linkedin
    if (instagram) profileFields.social.instagram = instagram

    try {
      let profile = await Profile.findOne({ user: req.user.id })

      //update i
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        )
        res.send(profile)
        return
      }

      //if profile doesn't exist create one
      profile = new Profile(profileFields)
      await profile.save()
      res.send(profile)
      return
    } catch (error) {
      console.log(error.message)
      res.status(500).send("Server Error")
    }
  }
)

//@GET API/profile
//@DESC Get all profile
//@ACCESS Public
router.get("/", async (req, res) => {
  try {
    const profile = await Profile.find()
      .populate("user", ["name", "avatar"])
      .catch(error => console.log(error.message))
    res.send(profile)
  } catch (error) {
    console.log(error.message)
    res.status(500).send("Server Error")
  }
})

//@GET API/profile/user/user_id
//@DESC Get user profile ID
//@ACCESS Public
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.user_id })
      .populate("user", ["name", "avatar"])
      .catch(error => console.log(error.message))

    if (!profile) return res.status(400).send({ msg: "Profile not Found" })
    res.send(profile)
  } catch (error) {
    console.log(error.message)
    res.status(500).send("Server Error")
  }
})

module.exports = router
