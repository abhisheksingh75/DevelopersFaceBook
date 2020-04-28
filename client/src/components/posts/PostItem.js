import React, { Fragment } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import Moment from "react-moment"
import { Link } from "react-router-dom"
import { addLike, removeLike, deletePost } from "../../action/post"

const PostItem = ({
  addLike,
  removeLike,
  auth,
  deletePost,
  showAction,
  post: { _id, avatar, name, text, likes, user, comments, date },
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
          {showAction && (
            <Fragment>
              <button onClick={(e) => addLike(_id)} className="btn btn-grey">
                <i className="fas fa-thumbs-up"></i>
                <span>{likes.length}</span>
              </button>
              <button onClick={(e) => removeLike(_id)} className="btn btn-grey">
                <i className="fas fa-thumbs-down"></i>
                {/* <span>1</span> */}
              </button>
              <Link to={`/posts/${_id}`} className="btn btn-primary">
                Comments{" "}
                <span className="comment-count">{comments.length}</span>
              </Link>
              {!auth.loading && user === auth.user._id && (
                <button
                  onClick={(e) => deletePost(_id)}
                  type="button"
                  className="btn btn-danger"
                >
                  <i className="fas fa-times" />
                </button>
              )}
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  )
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
}

PostItem.defaultProps = {
  showAction: true,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
)
