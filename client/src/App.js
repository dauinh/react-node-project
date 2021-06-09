import React, { useState } from 'react'
import AdminPage from './components/AdminPage'
import UserPage from './components/UserPage'
import Register from './components/Register'
import Login from './components/Login'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import { ThemeProvider } from '@material-ui/core'
import { theme } from './theme'

function App() {
  const [user, setUser] = useState(null)

  const logOut = () => {
    if (window.confirm('Log out?')) {
      window.localStorage.removeItem('loggedAppUser')
      window.localStorage.clear()
      window.location.reload()
    }
  }

  ////  REGISTER & LOGIN  ////
  if (!user) {
    return (
      <Router>
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
      </Router>
    )
  }
  
  ////  USER PAGE  ////
  if (!user.isAdmin) {
    return <UserPage user={user} logOut={logOut}/>
  }

  ////  ADMIN PAGE  ////
  return <AdminPage user={user} logOut={logOut}/>
}

export default App;