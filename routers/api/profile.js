const express = require("express")
const auth = require("../../middleware/auth")
const User = require("../../models/users")
const Profile = require("../../models/profile")
const request = require("request")
const config = require("config")
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

//@Delete API/profile
//@DESC Delete User Porfile
//@ACCESS Private
router.delete("/", auth, async (req, res) => {
  try {
    //Delete All posts from user

    //Delete User Profile Entries
    await Profile.findOneAndDelete({ user: req.user.id })
    //Delete User Details
    await User.findOneAndDelete({ _id: req.user.id })
    res.json({ msg: "User deleted" })
  } catch (error) {
    console.log(error.message)
    res.status(500).send({ msg: "Server Error" })
  }
})

//@PUT API/profile/experience
//@DESC add profile experience
//@ACCESS Private
router.put(
  "/experience",
  [
    auth,
    [
      check("title")
        .notEmpty()
        .withMessage("Title is requried"),
      check("company")
        .notEmpty()
        .withMessage("Company is requried"),
      check("from")
        .notEmpty()
        .withMessage("from is requried")
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() })
    }
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } = req.body

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    }

    try {
      //find profile using UserID
      const profile = await Profile.findOne({ user: req.user.id })
      if (!profile) {
        return res.status(400).json({ msg: "Profile not found" })
      }

      profile.experience.unshift(newExp)
      await profile.save()
      res.send(profile)
    } catch (error) {
      console.log(error.message)
      res.status(500).send("Server error")
    }
  }
)

//@ Delete API/profile/experience/:exp_id
//@DESC delete profile experience
//@ACCESS Private
router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    //find profile
    const profile = await Profile.findOne({ user: req.user.id })
    const exp_idx = profile.experience
      .map(item => item._id)
      .indexOf(req.params.exp_id)

    if (exp_idx < 0) {
      return res.status(400).send("experinence not found")
    }
    profile.experience.splice(exp_idx, 1)
    await profile.save()
    res.send(profile)
  } catch (error) {
    console.log(error.message)
    res.sendStatus(500).send("Server Error")
  }
})

//@PUT API/profile/education
//@DESC add profile educationn
//@ACCESS Private
router.put(
  "/education",
  [
    auth,
    [
      check("school")
        .notEmpty()
        .withMessage("school is requried"),
      check("degree")
        .notEmpty()
        .withMessage("degree is requried"),
      check("fieldofstudy")
        .notEmpty()
        .withMessage("fieldofstudy is requried"),
      check("from")
        .notEmpty()
        .withMessage("from is requried")
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() })
    }
    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = req.body

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    }

    try {
      //find profile using UserID
      const profile = await Profile.findOne({ user: req.user.id })
      if (!profile) {
        return res.status(400).json({ msg: "Profile not found" })
      }

      profile.education.unshift(newEdu)
      await profile.save()
      res.send(profile)
    } catch (error) {
      console.log(error.message)
      res.status(500).send("Server error")
    }
  }
)

//@ Delete API/profile/education/:edu_id
//@DESC delete profile experience
//@ACCESS Private
router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    //find profile
    const profile = await Profile.findOne({ user: req.user.id })
    const edu_idx = profile.education
      .map(item => item._id)
      .indexOf(req.params.edu_id)
    if (edu_idx < 0) {
      return res.status(400).send("education not found")
    }
    profile.education.splice(edu_idx, 1)
    await profile.save()
    res.send(profile)
  } catch (error) {
    console.log(error.message)
    res.sendStatus(500).send("Server Error")
  }
})

//@PUT API/profile/github/:username
//@DESC get user repo from github
//@ACCESS public
router.get("/github/:username", (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`,
      method: "GET",
      headers: { "user-agent": "node.js" }
    } 
    request(options, (error, response, body) => {
      if (error) console.log(error.message)

      if (response.statusCode !== 200) {
        res.status(200).json({ msg: "no github profile found" })
        return
      }
      res.json(JSON.parse(body))
      return
    })
  } catch (error) {}
})

module.exports = router
