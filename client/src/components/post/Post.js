import React, { Fragment, useEffect } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import Spinner from "../layouts/Spinner"
import { getPost } from "../../action/post"
import PostItem from "../../components/posts/PostItem"
import { Link } from "react-router-dom"
import CommentForm from "./CommentForm"
import CommentItem from "./CommentItem"

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id)
  }, [getPost])
  return loading || post == null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/posts" className="btn">
        Back to Post
      </Link>
      <PostItem post={post} showAction={false} />
      <CommentForm postId={match.params.id} />
      <div className="comments">
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </Fragment>
  )
}
Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
}

const mapStateToPros = (state) => ({
  post: state.post,
})
export default connect(mapStateToPros, { getPost })(Post)
