import React, { Fragment } from "react"
import PropTypes from "prop-types"
import Moment from "react-moment"
import { connect } from "react-redux"
import { deleteExperience } from "../../action/profile"

const Experience = ({ experience, deleteExperience }) => {
  const handleOnClick = (e, id) => {
    deleteExperience(id)
  }

  const experiences = experience.map((record) => {
    return (
      <tr key={record._id}>
        <td>{record.company}</td>
        <td className="hide-sm">{record.title}</td>
        <td className="hide-sm">
          <Moment format="MM/DD/YYYY">{record.from}</Moment>-
          {record.to === null ? (
            "Present"
          ) : (
            <Moment format="MM/DD/YYYY">{record.to}</Moment>
          )}
        </td>
        <td>
          <button
            class="btn btn-danger"
            onClick={(e) => handleOnClick(e, record._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    )
  })
  return (
    <Fragment>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  )
}

Experience.propTypes = {
  deleteExperience: PropTypes.func.isRequired,
}

export default connect(null, { deleteExperience })(Experience)
