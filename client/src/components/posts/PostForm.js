import React, { useState, Fragment } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { addPost } from "../../action/post"

const PostForm = ({ addPost }) => {
  const [text, setText] = useState("")
  const changeHandler = (e) => {
    e.preventDefault()
    setText(e.target.value)
  }

  return (
    <Fragment>
      <div class="bg-primary">
        <h3>Share your thoughts!!</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={(e) => {
          e.preventDefault()
          addPost({ text })
          setText("")
        }}
      >
        <textarea
          name="text"
          id=""
          cols="30"
          rows="5"
          className="my-2 p-1"
          placeholder="Say Somehting..."
          value={text}
          onChange={(e) => changeHandler(e)}
        ></textarea>
        <button type="submit" className="btn btn-dark">
          Submit
        </button>
      </form>
    </Fragment>
  )
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
}

export default connect(null, { addPost })(PostForm)
