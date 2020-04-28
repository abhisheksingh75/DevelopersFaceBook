import React, { Fragment, useEffect } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
//layouts
import NavBar from "./components/layouts/NavBar"
import Landing from "./components/layouts/Landing"
import Alert from "./components/layouts/Alert"
//auth
import Login from "./components/auths/Login"
import Register from "./components/auths/Register"
//route
import PrivateRoute from "./components/routing/PrivateRoute"
//style
import "./App.css"
//Redux
import { Provider } from "react-redux"
import store from "./store"
import { loadUser } from "./action/auth"
import setAuthTokoen from "./uitils/setAuthToken"
import Dashboard from "./components/dashboard/Dashboard"
import CreateProfile from "./components/profile-forms/CreateProfile"
import EditProfile from "./components/profile-forms/EditProfile"
import AddExperience from "./components/profile-forms/AddExperience"
import AddEducation from "./components/profile-forms/AddEducation"
import Profiles from "./components/profiles/Profiles"
import Profile from "./components/profile/Profile"
import Posts from "./components/posts/Posts"
import Post from "./components/post/Post"

if (localStorage.token) {
  setAuthTokoen(localStorage.token)
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Fragment>
          <NavBar />
          <Route exact path="/" component={Landing}></Route>
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register}></Route>
              <Route exact path="/login" component={Login}></Route>
              <Route exact path="/profile/:id" component={Profile}></Route>
              <Route exact path="/Profiles" component={Profiles}></Route>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path="/edit-profile"
                component={EditProfile}
              />
              <PrivateRoute
                exact
                path="/add-experience"
                component={AddExperience}
              />
              <PrivateRoute
                exact
                path="/add-education"
                component={AddEducation}
              />
              <PrivateRoute exact path="/posts" component={Posts} />
              <PrivateRoute exact path="/posts/:id" component={Post} />
            </Switch>
          </section>
        </Fragment>
      </BrowserRouter>
    </Provider>
  )
}

export default App
