import React, { useEffect, Fragment } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { getGithubRepos } from "../../action/profile"
import Spinner from "../layouts/Spinner"

const ProfileGithub = ({ username, getGithubRepos, repos }) => {
  useEffect(() => {
    getGithubRepos(username)
  }, [getGithubRepos, username])
  return (
    <Fragment>
      <div className="profile-github">
        <h2 className="text-primary my-1">
          <i className="fab fa-github"></i> Github Repos
        </h2>
        {repos === null ? (
          <Spinner />
        ) : (
          repos.map((repo, index) => {
            return (
              <div key={index} className="repo bg-light my-1 p-1">
                <div>
                  <h4>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {repo.name}
                    </a>
                  </h4>
                  <p>{repo.description}</p>
                </div>
                <div>
                  <ul>
                    <li className="badge badge-primary">
                      Star: {repo.stargazers_count}
                    </li>
                    <li className="badge badge-dark">
                      Watchers: {repo.watchers_count}
                    </li>
                    <li className="badge">Forks: {repo.forks_count}</li>
                  </ul>
                </div>
              </div>
            )
          })
        )}
      </div>
    </Fragment>
  )
}

ProfileGithub.propTypes = {
  getGithubRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
}
const mapStateToprops = (state) => ({
  repos: state.profile.repos,
})

export default connect(mapStateToprops, { getGithubRepos })(ProfileGithub)
