import React, { useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const { email, password } = formData

  const OnChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const OnSubmit = async e => {
    e.preventDefault()
    console.log("SUCCESS")
  }

  return (
    <>
      {/*Alert*/}
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user-circle"></i> Sign in your Account
      </p>

      <form onSubmit={e => OnSubmit(e)} className="form">
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={e => OnChange(e)}
          />
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
        <input type="submit" text="login" className="btn btn-primary" />
      </form>
      <p className="my-1">
        Don't have an account?
        <Link to="/Register">Sign up</Link>
      </p>
    </>
  )
}
export default Login
