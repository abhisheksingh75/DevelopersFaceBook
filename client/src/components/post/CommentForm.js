import React, { useState, Fragment } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { addComment } from "../../action/post"

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState("")
  return (
    <Fragment>
      <div className="bg-primary">
        <h3>Leave Comment!!</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={(e) => {
          e.preventDefault()
          addComment(postId, { text })
          setText("")
        }}
      >
        <textarea
          name="text"
          id=""
          cols="30"
          rows="5"
          className="my-2 p-1"
          placeholder="Wanna say thing, type here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button type="submit" className="btn btn-dark">
          Submit
        </button>
      </form>
    </Fragment>
  )
}

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
}

export default connect(null, { addComment })(CommentForm)
