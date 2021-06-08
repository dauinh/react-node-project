import React, { useState } from 'react'
import registerService from '../services/register'

const Register = () => {
  const [errorMessage, setErrorMessage] = useState('')
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
      setErrorMessage('Register successfully')
      setUsername('')
      setPassword('')
      setName('')
      setBreed('')
    } catch (exception) {
      setErrorMessage('Invalid username or passwords')
      console.log(exception)
    }
  }

  return (
    <div>
      <h2>Register</h2>
      <h3>{errorMessage}</h3>
      <form onSubmit={handleRegister}>
        <div>
          username &nbsp;
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password &nbsp;
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div>
          name &nbsp; &nbsp; &nbsp; &nbsp;
          <input
            type="text"
            value={name}
            name="Name"
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          breed &nbsp; &nbsp; &nbsp; &nbsp;
          <input
            type="text"
            value={breed}
            name="Breed"
            onChange={({ target }) => setBreed(target.value)}
          />
        </div>
        <button type="submit">register</button>
      </form>
    </div>
  )
}

export default Register