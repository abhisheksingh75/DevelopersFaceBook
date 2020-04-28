import React, { useState } from "react"
// import axios from "axios"
import PropTypes from "prop-types"
import { Link, Redirect } from "react-router-dom"
import { connect } from "react-redux"
import { login } from "../../action/auth"

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const { email, password } = formData

  const OnChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const OnSubmit = async (e) => {
    e.preventDefault()
    login({ email, password })
  }

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }
  return (
    <>
      {/*Alert*/}
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user-circle"></i> Sign in your Account
      </p>

      <form onSubmit={(e) => OnSubmit(e)} className="form">
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => OnChange(e)}
            autoComplete="true"
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={(e) => OnChange(e)}
            autoComplete="true"
          />
        </div>
        <button text="login" className="btn btn-primary">
          submit
        </button>
      </form>
      <p className="my-1">
        Don't have an account?
        <Link to="/Register">Sign up</Link>
      </p>
    </>
  )
}
Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { login })(Login)
