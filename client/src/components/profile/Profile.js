import React, { Fragment, useEffect } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import Spinner from "../layouts/Spinner"
import { getProfileById } from "../../action/profile"
import { Link } from "react-router-dom"
import ProfileTop from "./ProfileTop"
import ProfileAbout from "./ProfileAbout"
import ProfileExperience from "./ProfileExperience"
import ProfileEducation from "./ProfileEducation"
import ProfileGithub from "./ProfileGithub"

const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match,
}) => {
  useEffect(() => {
    getProfileById(match.params.id)
  }, [getProfileById, match.params.id])

  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn">
            Back to Profiles
          </Link>

          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn">
                Edit Profile
              </Link>
            )}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            {/* Experience */}
            <div className="profile-experience bg-light p-2">
              <h2 className="text-primary">Experiences</h2>
              {profile.experience.length > 0 ? (
                <Fragment>
                  {profile.experience.map((experience) => (
                    <ProfileExperience
                      key={experience._id}
                      experience={experience}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No Experience added</h4>
              )}
            </div>
            {/* Education */}
            <div className="profile-edu bg-light p-2">
              <h2 className="text-primary">Education</h2>
              {profile.education.length > 0 ? (
                <Fragment>
                  {profile.education.map((education) => (
                    <ProfileEducation
                      key={education._id}
                      education={education}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No Education added</h4>
              )}
            </div>
            {profile.githubusername && (
              <ProfileGithub username={profile.githubusername} />
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}
Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
})

export default connect(mapStateToProps, { getProfileById })(Profile)
