import React, { Fragment } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import Moment from "react-moment"
import { deleteComment } from "../../action/post"

const CommentItem = ({
  postId,
  auth,
  deleteComment,
  comment: { _id, text, name, avatar, user, date },
}) => {
  return (
    <Fragment>
      <div className="post bg-light my-2 p-1">
        <div>
          <Link to={`/profile/${user}`}>
            <img
              src={avatar}
              alt={name.toUpperCase()}
              className="round-image"
            />
            <h4>{name.toUpperCase()}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">{text}</p>
          <p className="post-date">
            Posted on <Moment format="MM/DD/YYYY">{date}</Moment>
          </p>
          {!auth.loading && user === auth.user._id && (
            <button
              onClick={(e) => deleteComment(postId, _id)}
              TYPE="button"
              className="btn btn-danger"
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>
      </div>
    </Fragment>
  )
}

CommentItem.propTypes = {
  auth: PropTypes.object.isRequired,
  postId: PropTypes.number.isRequired,
  comment: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
}
const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { deleteComment })(CommentItem)
