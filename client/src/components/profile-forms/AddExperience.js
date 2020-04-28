import React, { Fragment, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import { addExperience } from "../../action/profile"
// import { set } from "mongoose"

function AddExperience({ addExperience, history }) {
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  })

  const [toDateDisabled, toggleDisabled] = useState(false)
  const { company, title, location, from, to, current, description } = formData

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  function handleOnSubmit(e) {
    e.preventDefault()
    addExperience(formData, history)
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Add Experience</h1>
      <p className="lead">
        <i className="fab fa-black-tie text-primary"></i> Add any Developer or
        Programming position that you had in past or current
      </p>
      <small>* required fields</small>
      <form className="form m-1">
        <div className="form-group">
          <input
            type="text"
            placeholder="*Job Title"
            name="title"
            value={title}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">Enter job Title</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="*Company"
            name="company"
            value={company}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">Enter company name(e.g. Delitte)</small>
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">Enter City or State(eg.Bangalore)</small>
        </div>

        <div className="form-group">
          <label for="from-date">From Date</label>
          <input
            type="date"
            placeholder="dd/mm/yyyy"
            name="from"
            id="from"
            value={from}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            Enter start date of working(e.g. 31/12/2019)
          </small>
        </div>

        <div className="form-group">
          <label for="to-date">To Date</label>
          <input
            type="date"
            placeholder="dd/mm/yyyy"
            name="to"
            id="to"
            value={toDateDisabled ? "" : to}
            onChange={(e) => onChange(e)}
            disabled={toDateDisabled ? "disabled" : ""}
          />
          <small className="form-text">
            Enter end date of working(e.g. 31/12/2019)
          </small>
        </div>

        <div className="form-group">
          <input
            type="checkbox"
            name="current"
            id="current"
            checked={current}
            value={current}
            onChange={(e) => {
              setFormData({ ...formData, current: !current })
              toggleDisabled(!toDateDisabled)
            }}
          />
          <label for="current">Present</label>
        </div>

        <div className="form-group">
          <textarea
            cols="30"
            rows="5"
            placeholder="Job Description"
            name="description"
            value={description}
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>

        <button className="btn btn-primary" onClick={(e) => handleOnSubmit(e)}>
          Submit
        </button>
        <Link to="/dashboard" className="btn btn-light">
          Go Back
        </Link>
      </form>
    </Fragment>
  )
}

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
}

export default connect(null, { addExperience })(withRouter(AddExperience))
