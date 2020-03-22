import axios from "axios"
import { setAlert } from "./alert"
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR
} from "./types"
import setAuthTokoen from "../uitils/setAuthToken"

///LOAD USER
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthTokoen(localStorage.token)
  }

  try {
    const res = await axios.get("/api/auth")
    dispatch({
      type: USER_LOADED,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: AUTH_ERROR
    })
  }
}

//REGISTER USER
export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      "content-type": "application/json"
    }
  }
  const body = JSON.stringify({ name, email, password })
  try {
    const res = await axios.post("/api/user", body, config)
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    })
  } catch (err) {
    console.log(err)
    const errors = err.response.data.errors
    errors.forEach(error => {
      dispatch(setAlert(error.msg, "danger"))
    })
    dispatch({
      type: REGISTER_FAIL
    })
  }
}
