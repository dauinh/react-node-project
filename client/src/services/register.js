import axios from 'axios'

const login = async credentials => {
  const response = await axios.post('/login', credentials)
  return response.data
}

const register = async credentials => {
  const response = await axios.post('/register', credentials)
  return response.data
}

export default { login, register }