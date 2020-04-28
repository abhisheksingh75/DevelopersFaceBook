import React, { Fragment } from "react"
import PropTypes from "prop-types"
import Moment from "react-moment"

const ProfileEducation = ({
  education: { school, degree, fieldofstudy, from, to, current, description },
}) => {
  return (
    <Fragment>
      <div>
        <h3>{school}</h3>
        <Moment format="MM/DD/YYYY">{from}</Moment>-
        {!to ? "Present" : <Moment format="MM/DD/YYYY">{to}</Moment>}
        <p>
          <strong>Degree:</strong>
          {degree}
        </p>
        <p>
          <strong>Field of study:</strong>
          {fieldofstudy}
        </p>
        {description !== "" && (
          <Fragment>
            {" "}
            <p>
              <strong>Description:</strong>
              {description}
            </p>
          </Fragment>
        )}
      </div>
    </Fragment>
  )
}

ProfileEducation.propTypes = {
  education: PropTypes.array.isRequired,
}

export default ProfileEducation
