import React, { Fragment } from "react"
import PropTypes from "prop-types"
import Moment from "react-moment"

const ProfileExperience = ({
  experience: { title, company, location, from, to, current, description },
}) => {
  return (
    <Fragment>
      <div>
        <h3>{company}</h3>
        <Moment format="MM/DD/YYYY">{from}</Moment>-
        {!to ? "Present" : <Moment format="MM/DD/YYYY">{to}</Moment>}
        <p>
          <strong>Position:</strong>
          {title}
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

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired,
}

export default ProfileExperience
