import React, { useState, useEffect } from 'react'
import registerService from '../services/register'
import taskService from '../services/tasks'
import userService from '../services/users'
import { Button, TextField } from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom'

const Login = ({ setUser }) => {
  const [error, setError] = useState(false)
  const [errorText, setErrorText] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  let history = useHistory()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await registerService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedAppUser', JSON.stringify(user)
      )
      taskService.setToken(user.token)
      userService.setToken(user.token)
      userService.getByUsername(user.username).then(data => {   // send data using useParams?
        setUser(data)
      })
      setUsername('')
      setPassword('')
      history.push(`${username}`)      // go to user route after logging in
    } catch (exception) {
      console.log('invalid username or password')
      setError(true)
      setErrorText('invalid username or password')
      setTimeout(() => {
        setError(false)
      }, 3000)
    }
  }

  return (
    <div className='register-box'>
      <h1>Log in</h1>
      <form onSubmit={handleLogin}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Username"
          name="username"
          error={error}
          helperText={error ? errorText : ""}
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
          error={error}
          helperText={error ? errorText : ""}
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
      <Link to='/register' className='register-link'>Don't have an account? Register here</Link>
    </div>
  )
}

export default Login