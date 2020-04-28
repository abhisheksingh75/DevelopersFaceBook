import React, { Fragment } from "react"
import PropTypes from "prop-types"

const ProfileAbout = ({
  profile: {
    user: { name },
    bio,
    skills,
  },
}) => {
  return (
    <Fragment>
      <div className="profile-about bg-light py-2">
        <h2 className="text-primary">
          {
            name
              .toUpperCase()
              .trim()
              .split(" ")[0]
          }
          {"'s"}
          {" Bio"}
        </h2>
        <p>{bio}</p>
        <div className="line"></div>
        <div className="text-primary">Skills Set</div>
        <div className="skills">
          {skills.slice(0, 5).map((skill, index) => {
            if (skill) {
              return (
                <div className="p-1" key={index}>
                  <i className="fas fa-check"></i>
                  {skill}
                </div>
              )
            }
          })}
        </div>
      </div>
    </Fragment>
  )
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
}

export default ProfileAbout
