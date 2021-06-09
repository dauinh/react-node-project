import React, { useState } from 'react'
import AdminPage from './components/AdminPage'
import UserPage from './components/UserPage'
import Register from './components/Register'
import Login from './components/Login'
import { Switch, Route, useHistory } from "react-router-dom"
import { ThemeProvider } from '@material-ui/core'
import { theme } from './theme'

function App() {
  const [user, setUser] = useState(null)

  let history = useHistory()

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
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
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