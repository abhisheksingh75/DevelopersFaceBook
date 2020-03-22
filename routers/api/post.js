const express = require("express")
const router = express.Router()
const { check, validationResult } = require("express-validator")
const auth = require("../../middleware/auth")
const Post = require("../../models/post")
const Profile = require("../../models/profile")
const User = require("../../models/users")

//@POST post API
//@DESC create Post
//@ACCESS Private
router.post(
  "/",
  [
    auth,
    [
      check("text")
        .notEmpty()
        .withMessage("Text is required")
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    try {
      const user = await User.findById({ _id: req.user.id }).select("-password")
      const newPost = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      }

      const post = new Post(newPost)
      await post.save()
      res.send(post)
    } catch (error) {
      console.log(error.message)
      res.status(500).send("Server Error")
    }
  }
)

//@Get /api/post/:id
//@DESC get all post
//@ACCESS Private

router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById({ _id: req.params.id }).sort({
      date: "desc"
    })
    if (!post) {
      res.status(400).send({ msg: "post not found" })
    }
    res.json(post)
  } catch (error) {
    console.log(error.message)
    res.status(500).send("Server Error")
  }
})

//@Delete Delete /api/post/:id
//@DESC Delete ID
//@ACCESS Private

router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById({ _id: req.params.id }).sort({
      date: "desc"
    })

    //check if post exists
    if (!post) {
      res.status(400).send({ msg: "post not found" })
    }

    //check the user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" })
    }

    //delete post
    await post.remove()

    res.json({ msg: "Post removed" })
  } catch (error) {
    console.log(error.message)
    res.status(500).send("Server Error")
  }
})

//@PUT  /api/post/like/:id
//@DESC like the post
//@ACCESS Private
router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById({ _id: req.params.id })

    //check if post exists
    if (!post) {
      return res.status(400).json({ msg: "post does not exists" })
    }

    if (
      post.likes.filter(like => like.user.toString() === req.user.id.toString())
        .length > 0
    ) {
      return res.status(400).json({ msg: "Post already liked by You" })
    }

    post.likes.unshift({ user: req.user.id })
    await post.save()
    res.send(post.likes)
  } catch (error) {
    console.log(error.message)
    res.status(400).send("server Error")
  }
})

//@PUT  /api/post/unlike/:id
//@DESC unlike the post
//@ACCESS Private
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById({ _id: req.params.id })

    //check if post exists
    if (!post) {
      return res.status(400).json({ msg: "post does not exists" })
    }

    //check if the post is been liked or not
    if (
      post.likes.filter(like => like.user.toString() === req.user.id.toString())
        .length === 0
    ) {
      return res.status(400).json({ msg: "Post has not yet been liked" })
    }

    //Get Index removed
    const removeIndex = post.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id.toString())

    post.likes.splice(removeIndex, 1)
    await post.save()
    res.send(post.likes)
  } catch (error) {
    console.log(error.message)
    res.status(400).send("server Error")
  }
})

//@ROUTE /api/post/comment/:id
//@DESC  post on a comment
//@ACCESS Private
router.post(
  "/comment/:id",
  [
    auth,
    [
      check("text")
        .notEmpty()
        .withMessage("Text is required")
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    try {
      const post = await Post.findById({ _id: req.params.id })

      //check if post exists
      if (!post) {
        return res.status(400).json({ msg: "post does not exists" })
      }

      //fetch user
      const user = await User.findById({ _id: req.user.id }).select("-password")

      //check if user exists
      if (!user) {
        return res.status(400).json({ msg: "user does not exists" })
      }

      //create new Comment
      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      }

      post.comments.unshift(newComment)

      //save post
      await post.save()

      res.send(post)
    } catch (error) {
      console.log(error.message)
      res.status(500).send("Server Error")
    }
  }
)

//@ROUTE /api/post/comment/:id/:comment_id
//@DESC  delete comment
//@ACCESS Private
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById({ _id: req.params.id })

    //check if post exists
    if (!post) {
      return res.status(400).json({ msg: "post does not exists" })
    }

    //check if comment exists
    const removeIdx = post.comments
      .map(comment => comment._id.toString())
      .indexOf(req.params.comment_id.toString())

    if (removeIdx < 0) {
      return res.status(404).json({ msg: "comment does not exists" })
    }

    //check user is authorized
    if (req.user.id.toString() !== post.comments[removeIdx].user.toString()) {
      return res
        .status(401)
        .json({ msg: "User not authorized to delete comment" })
    }

    post.comments.splice(removeIdx, 1)

    //save post
    await post.save()
    res.send(post)
  } catch (error) {
    console.log(error.message)
    res.status(500).send("Server Error")
  }
})

module.exports = router
