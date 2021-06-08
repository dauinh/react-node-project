import React, { useState, useEffect } from 'react'
import registerService from '../services/register'
import taskService from '../services/tasks'
import userService from '../services/users'

const Login = ({ user, setUser }) => {
  const [errorMessage, setErrorMessage] = useState('')
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
      setErrorMessage('Wrong credentials')
      console.log('Wrong credentials')
      setTimeout(() => {
        setErrorMessage('Enter again')
      }, 5000)
    }
  }

  return (
    <div>
      <h2>Log in</h2>
      <h3>{errorMessage}</h3>
      <form onSubmit={handleLogin}>
        <div>
          username &ensp;
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password &ensp;
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default Login