import React, { useState, useEffect } from 'react'
import registerService from '../services/register'
import taskService from '../services/tasks'
import userService from '../services/users'
import { Button, TextField, ThemeProvider } from '@material-ui/core'
// import { useStyles } from '../style'
import { theme } from '../theme'

const Login = ({ user, setUser }) => {
  // const classes = useStyles()
  // const [errorMessage, setErrorMessage] = useState('')
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 

  useEffect(() => {

    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      taskService.setToken(user.token)
      userService.setToken(user.token)
      // go to user route after logging in
      userService.getByUsername(user.username).then(data => {
        setUser(data)
      })
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    // console.log('logging in with', username, password)
    try {
      const user = await registerService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedAppUser', JSON.stringify(user)
      )
      taskService.setToken(user.token)
      userService.setToken(user.token)
      // go to user route after logging in
      userService.getByUsername(user.username).then(data => {
        setUser(data)
      })
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
      // setErrorMessage('Wrong credentials')
      // console.log('Wrong credentials')
      // setTimeout(() => {
      //   setErrorMessage('Enter again')
      // }, 5000)
    }
  }

  return (
    <div className='register-box'>
      <h1>Log in</h1>
      {/* <h4>{errorMessage}</h4> */}
      <ThemeProvider theme={theme}>
        <form onSubmit={handleLogin}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Username"
            name="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button 
            type="submit"
            fullWidth
            className='register-button'
            variant='contained'
            color='primary'
          >
            Login
          </Button>
        </form>
      </ThemeProvider>
    </div>
  )
}

export default Login