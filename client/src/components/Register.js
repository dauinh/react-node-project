import React, { useState } from 'react'
import registerService from '../services/register'
import { Button, TextField } from '@material-ui/core'
import { Link } from 'react-router-dom'
// import { useStyles } from '../style'

const Register = () => {
  // const classes = useStyles()
  const [error, setError] = useState(false)
  const [errorText, setErrorText] = useState('')
  const [message, setMessage] = useState('Create an account to start using app')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [breed, setBreed] = useState('')

  const helperText = {
    username: "length from 2-20 characters and must be unique",
    password: "must be greater than 3 characters"
  }

  const handleRegister = async (event) => {
    event.preventDefault()
    try {
      const newUser = {
        username: username,
        password: password,
        name: name,
        breed: breed
      }
      await registerService.register(newUser)
      setMessage('Register successfully')
      setUsername('')
      setPassword('')
      setName('')
      setBreed('')
    } catch (exception) {
      console.log('invalid username or password')
      setError(true)
      setMessage('Try again')
      setErrorText('invalid username or password')
      setTimeout(() => {
        setError(false)
      }, 3000)
    }
  }

  return (
    <div className='register-box'>
      <h1>Register</h1>
      <h4>{message}</h4>
      <form onSubmit={handleRegister}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Username"
          name="username"
          error={error}
          helperText={error ? errorText : helperText.username}
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
          helperText={error ? errorText : helperText.password}
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Name"
          name="name"
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Breed"
          name="breed"
          value={breed}
          onChange={({ target }) => setBreed(target.value)}
        />
        <Button 
          type="submit"
          fullWidth
          className='register-button'
          variant='contained'
          color='primary'
        >
          Register
        </Button>
      </form>
      <Link to='/login' className='register-link'>Continue to log in</Link>
    </div>
  )
}

export default Register