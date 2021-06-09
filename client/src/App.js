import React, { useState, useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import taskService from './services/tasks'
import userService from './services/users'
import Header from './components/common/Header'
import AdminPage from './components/admin/AdminPage'
import UserPage from './components/user/UserPage'
import Register from './components/Register'
import Login from './components/Login'
import { Switch, Route, useHistory } from "react-router-dom"

function App() {
  const [user, setUser] = useState(null)

  let history = useHistory()
  let tokenExpired = false
  
  useEffect(() => {
    // check if token is saved in localStorage in every render
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (!loggedUserJSON) return null
    const user = JSON.parse(loggedUserJSON)
    const decodedToken = jwt_decode(user.token, { complete: true })
    const dateNow = new Date()
    if (decodedToken.exp < dateNow.getTime()) {
      tokenExpired = true
      logOut()
    }
    if (!tokenExpired) {
      taskService.setToken(user.token)
      userService.setToken(user.token)
      userService.getByUsername(user.username).then(data => {
        setUser(data)
      })
      history.push(`${user.username}`)      // go to user route after logging in
    }
  }, [history])

  const logOut = () => {
    if (window.confirm('Log out?')) {
      window.localStorage.removeItem('loggedAppUser')
      window.localStorage.clear()
      history.push('/login')
      window.location.reload()
    }
  }

  ////  REGISTER & LOGIN  ////
  if (!user) {
    return (
      <div>
        <Switch>
          <Route path="/login">
            <Login setUser={setUser}/>
          </Route>
        </Switch>
        <Switch>
          <Route path="/register">
            <Register/>
          </Route>
        </Switch>
      </div>
    )
  }
  
  ////  USER PAGE  ////
  if (!user.isAdmin) {
    return (
      <Route path="/:username">
        <Header user={user} logOut={logOut}/>
        <UserPage user={user}/>
      </Route>
    )
  }

  ////  ADMIN PAGE  ////
  return (
    <Route path="/:username">
      <Header user={user} logOut={logOut}/>
      <AdminPage/>
    </Route>
  )
}

export default App;