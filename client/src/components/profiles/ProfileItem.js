import React, { Fragment } from "react"
import { Link } from "react-router-dom"

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills,
  },
}) => {
  return (
    <Fragment>
      <div class="profile bg-light">
        <div>
          <img class="round-image" src={avatar} alt={name} />
        </div>
        <div>
          <h2>{name.toUpperCase()}</h2>
          <p>
            {status}
            {company && <span> at {company}</span>}
          </p>
          <p>{location && <span>{location}</span>}</p>
          <div className="my-1">
            <Link to={`/profile/${_id}`} class="btn btn-primary">
              View Profile
            </Link>
          </div>
        </div>
        <ul>
          {skills.slice(0, 5).map((skill, index) => {
            if (skill) {
              return (
                <li key={index} className="text-primary">
                  <i className="fas fa-check"></i> <span>{skill}</span>
                </li>
              )
            }
          })}
        </ul>
      </div>
    </Fragment>
  )
}

ProfileItem.propTypes = {}

export default ProfileItem
