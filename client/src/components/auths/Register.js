import React, { useState } from "react"
import { connect } from "react-redux"
import { setAlert } from "../../action/alert"
import { register } from "../../action/auth"
import axios from "axios"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
const Register = props => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  })

  const { name, email, password, password2 } = formData

  const OnChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const OnSubmit = async e => {
    e.preventDefault()
    if (password !== password2) {
      props.setAlert("passwords don't match", "danger")
    } else {
      props.register({ name, email, password })
    }
  }

  return (
    <>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user-circle"></i> Create Your Account
      </p>

      <form onSubmit={e => OnSubmit(e)} className="form">
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={e => OnChange(e)}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={e => OnChange(e)}
          />
          <small className="form-text">
            This site uses Gravatar, so if you want a profile image, use a
            Gravatar email
          </small>
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={e => OnChange(e)}
            autoComplete
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            value={password2}
            onChange={e => OnChange(e)}
            autoComplete
          />
        </div>
        <input type="submit" text="Register" className="btn btn-primary" />
      </form>
      <p className="my-1">
        Already have an account?
        <Link to="/login">Sign In</Link>
      </p>
    </>
  )
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired
}

export default connect(null, { setAlert, register })(Register)
