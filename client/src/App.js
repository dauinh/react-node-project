import React, { useState, useEffect } from 'react'
import taskService from './services/tasks'
import userService from './services/users'
import AdminPage from './components/AdminPage'
import UserPage from './components/UserPage'
import Register from './components/Register'
import Login from './components/Login'
import { Switch, Route, useHistory } from "react-router-dom"
import { AppBar } from '@material-ui/core'

function App() {
  const [user, setUser] = useState(null)

  let history = useHistory()
  
  useEffect(() => {
    // check if token is saved in localStorage in every render
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      taskService.setToken(user.token)
      userService.setToken(user.token)
      userService.getByUsername(user.username).then(data => {
        setUser(data)
      })
      history.push(`${user.username}`)      // go to user route after logging in
    }
  }, [])

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
            <Login user={user} setUser={setUser}/>
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

  const Header = () => {
    return (
      <div>
        <AppBar>

        </AppBar>
      </div>
    )
  }
  
  ////  USER PAGE  ////
  if (!user.isAdmin) {
    return (
      <Route path="/:username">
        <UserPage user={user} logOut={logOut}/>
      </Route>
    )
  }

  ////  ADMIN PAGE  ////
  return (
    <Route path="/:username">
      <AdminPage user={user} logOut={logOut}/>
    </Route>
  )
}

export default App;