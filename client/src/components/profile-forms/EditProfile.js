import React, { useState, Fragment, useEffect } from "react"
import { Link, withRouter } from "react-router-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { createProfile, getCurrentProfile } from "../../action/profile"

const EditProfile = ({
  createProfile,
  getCurrentProfile,
  profile: { profile, loading },
  history,
}) => {
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
  })

  useEffect(() => {
    getCurrentProfile()
    setFormData({
      company: loading || !profile.company ? "" : profile.company,
      website: loading || !profile.website ? "" : profile.website,
      location: loading || !profile.location ? "" : profile.location,
      status: loading || !profile.status ? "" : profile.status,
      skills: loading || !profile.skills ? "" : profile.skills.join(","),
      githubusername:
        loading || !profile.githubusername ? "" : profile.githubusername,
      bio: loading || !profile.bio ? "" : profile.bio,
      twitter: loading || !profile.social ? "" : profile.social.twitter,
      facebook: loading || !profile.social ? "" : profile.social.facebook,
      linkedin: loading || !profile.social ? "" : profile.social.linkedin,
      youtube: loading || !profile.social ? "" : profile.social.youtube,
      instagram: loading || !profile.social ? "" : profile.social.instagram,
    })
  }, [loading, getCurrentProfile])
  const [displaySocialInputs, toggleSocialInputs] = useState(false)

  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData
  const socialInputs = (
    <Fragment>
      <div className="form-group social-input">
        <i className="fab fa-twitter fa-2x"></i>
        <input
          type="text"
          placeholder="Twitter"
          name="twitter"
          value={twitter}
          onChange={(e) => onChange(e)}
        />
      </div>

      <div className="form-group social-input">
        <i className="fab fa-facebook fa-2x"></i>
        <input
          type="text"
          placeholder="Facebook"
          name="facebook"
          value={facebook}
          onChange={(e) => onChange(e)}
        />
      </div>
      <div className="form-group social-input">
        <i className="fab fa-youtube fa-2x"></i>
        <input
          type="text"
          placeholder="Youtube"
          name="youtube"
          value={youtube}
          onChange={(e) => onChange(e)}
        />
      </div>

      <div className="form-group social-input">
        <i className="fab fa-linkedin fa-2x"></i>
        <input
          type="text"
          placeholder="Linkedin"
          name="linkedin"
          value={linkedin}
          onChange={(e) => onChange(e)}
        />
      </div>

      <div className="form-group social-input">
        <i className="fab fa-instagram fa-2x"></i>
        <input
          type="text"
          placeholder="Instagram"
          name="instagram"
          value={instagram}
          onChange={(e) => onChange(e)}
        />
      </div>
    </Fragment>
  )
  function handleToggleSocialInput(e) {
    e.preventDefault()
    toggleSocialInputs(!displaySocialInputs)
  }

  function handleOnSubmit(e) {
    e.preventDefault()
    createProfile(formData, history, true)
  }
  function onChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fa fa-user"></i>Let's get some information to make your
        profile standout
      </p>
      <small>* required fields</small>
      <form className="form my-1">
        <div className="form-group">
          <select name="status" value={status} onChange={(e) => onChange(e)}>
            <option value="0">Select professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior</option>
            <option value="Senior Developer">Senior</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of where you are in your career
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Company"
            name="company"
            value={company}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">Enter company name(e.g. Delitte)</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={website}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">Enter your website or blog link</small>
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
          <input
            type="text"
            placeholder="*Skills"
            name="skills"
            value={skills}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            PLease use comma separated values(e.g. HTML,CSS, PYTHON)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Gitgub User"
            name="githubusername"
            value={githubusername}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            Enter github user name(e.g. abhisheksingh75)
          </small>
        </div>
        <div className="form-group">
          <textarea
            cols="30"
            rows="5"
            placeholder="A short Bio"
            name="bio"
            value={bio}
            onChange={(e) => onChange(e)}
          ></textarea>
          <small className="form-text">Tell us about yourself</small>
        </div>

        <div className="my-2">
          <button
            onClick={(e) => handleToggleSocialInput(e)}
            className="btn btn-light"
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>
        {displaySocialInputs && socialInputs}

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

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  profile: state.profile,
})

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
)
