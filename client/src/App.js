import React, { Fragment, useEffect } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
//layouts
import NavBar from "./components/layouts/NavBar"
import Landing from "./components/layouts/Landing"
import Alert from "./components/layouts/Alert"
//auth
import Login from "./components/auths/Login"
import Register from "./components/auths/Register"
//style
import "./App.css"
//Redux
import { Provider } from "react-redux"
import store from "./store"
import { loadUser } from "./action/auth"
import setAuthTokoen from "./uitils/setAuthToken"
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
        <>
          <NavBar />
          <Route exact path="/" component={Landing}></Route>
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register}></Route>
              <Route exact path="/login" component={Login}></Route>
            </Switch>
          </section>
        </>
      </BrowserRouter>
    </Provider>
  )
}

export default App
