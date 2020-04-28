import axios from "axios"
import { setAlert } from "./alert"
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from "./types"

//Get posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/post")
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    })
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    })
  }
}

//add like
export const addLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/post/like/${id}`)
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    })
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    })
  }
}

//remove like
export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/post/unlike/${id}`)
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    })
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    })
  }
}

//Delete Posts
export const deletePost = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/post/${id}`)
    dispatch({
      type: DELETE_POST,
      payload: id,
    })
    dispatch(setAlert("Post Removed", "success"))
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    })
  }
}

//ADD_POST
//Delete Posts
export const addPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "content-type": "application/json",
    },
  }
  try {
    const res = await axios.post("/api/post", formData, config)
    dispatch({
      type: ADD_POST,
      payload: res.data,
    })
    dispatch(setAlert("Post Created", "success"))
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    })
  }
}

//Get post
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/post/${id}`)
    dispatch({
      type: GET_POST,
      payload: res.data,
    })
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    })
  }
}

//ADD COMMENT
export const addComment = (postId, formData) => async (dispatch) => {
  const config = {
    headers: {
      "content-type": "application/json",
    },
  }
  try {
    const res = await axios.post(
      `/api/post/comment/${postId}`,
      formData,
      config
    )
    dispatch({
      type: ADD_COMMENT,
      payload: res.data.comments,
    })
    dispatch(setAlert("Comment Added", "success"))
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    })
  }
}

//delete comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await axios.delete(`/api/post/comment/${postId}/${commentId}`)
    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    })
    dispatch(setAlert("Comment Removed", "success"))
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    })
  }
}
