import React, { useState } from 'react'
import registerService from '../services/register'
import { Button, TextField, ThemeProvider } from '@material-ui/core'
// import { useStyles } from '../style'
import { theme } from '../theme'

const Register = () => {
  // const classes = useStyles()
  // const [errorMessage, setErrorMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [breed, setBreed] = useState('')

  const handleRegister = async (event) => {
    event.preventDefault()
    // username has length from 2-20 character & must be unique
    // password must be longer than 3 character
    // username and password are necessary
    try {
      const newUser = {
        username: username,
        password: password,
        name: name,
        breed: breed
      }
      await registerService.register(newUser)
      // setErrorMessage('Register successfully')
      setUsername('')
      setPassword('')
      setName('')
      setBreed('')
    } catch (exception) {
      // setErrorMessage('Invalid username or passwords')
      console.log(exception)
    }
  }

  return (
    <div className='register-box'>
      <h1>Register</h1>
      {/* <h4>{errorMessage}</h4> */}
      <ThemeProvider theme={theme}>
        <form onSubmit={handleRegister}>
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
      </ThemeProvider>
    </div>
  )
}

export default Register