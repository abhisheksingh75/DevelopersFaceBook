import React, { Fragment } from "react"
import PropTypes from "prop-types"
import Moment from "react-moment"
import { connect } from "react-redux"
import { deleteEducation } from "../../action/profile"

const Education = ({ education, deleteEducation }) => {
  //   const handleOnClick = (e, id) => {
  //     deleteEducation(id)
  //   }

  const educations = education.map((record) => {
    return (
      <tr key={record._id}>
        <td>{record.school}</td>
        <td className="hide-sm">{record.degree}</td>
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
            onClick={() => deleteEducation(record._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    )
  })
  return (
    <Fragment>
      <h2 className="my-2">Education credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  )
}

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired,
  education: PropTypes.array.isRequired,
}

export default connect(null, { deleteEducation })(Education)
