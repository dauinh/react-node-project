import axios from 'axios'

const login = async credentials => {
  const response = await axios.post('http://localhost:8080/login', credentials)
  return response.data
}

const register = async credentials => {
  const response = await axios.post('http://localhost:8080/register', credentials)
  return response.data
}

export default { login, register }