import React, { Fragment, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import { addEducation } from "../../action/profile"

const AddEducation = ({ addEducation, history }) => {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
  })

  const [toDateDisabled, toggleDisabled] = useState(false)
  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  } = formData

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  function handleOnSubmit(e) {
    e.preventDefault()
    addEducation(formData, history)
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Add Education</h1>
      <p className="lead">
        <i className="fas fa-graduation-cap text-primary"></i> Add any School or
        Bootcamp you attended
      </p>
      <small>* required fields</small>
      <form className="form">
        <div className="form-group">
          <input
            type="text"
            placeholder="*School or BootCamp"
            name="school"
            value={school}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="*Degree or Certificate"
            name="degree"
            value={degree}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Field of Study"
            name="fieldofstudy"
            value={fieldofstudy}
            onChange={(e) => onChange(e)}
          />
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

AddEducation.propTypes = {
  AddEducation: PropTypes.func.isRequired,
}

export default connect(null, { addEducation })(withRouter(AddEducation))
