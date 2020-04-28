import React, { useEffect, Fragment } from "react"
import { connect } from "react-redux"
import { getCurrentProfile } from "../../action/profile"
import { PropTypes } from "prop-types"
import Spinner from "../layouts/Spinner"
import { Link } from "react-router-dom"

//Import ccomponents
import DashboardActions from "./DashboardActions.js"
import Experience from "./Experience.js"
import Education from "./Education"

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile()
  }, [getCurrentProfile])

  return loading && profile === null ? (
    <Spinner />
  ) : (
    !loading && (
      <Fragment>
        <div className="m-1">
          <h1 className="large text-primary">Dashboard</h1>
          <p className="lead">
            <i className="fas fa-user" /> Welcome {user && user.name}
          </p>
          {profile !== null ? (
            <Fragment>
              <DashboardActions />
              <Experience experience={profile.experience} />
              <Education education={profile.education} />
            </Fragment>
          ) : (
            // When you don't have profile
            <Fragment>
              <p>You have not yet setup a profile, please add some info.</p>
              <div className="my-1">
                <Link to="/create-profile" className="btn btn-primary">
                  Create Profile
                </Link>
              </div>
            </Fragment>
          )}
        </div>
      </Fragment>
    )
  )
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
})

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard)
