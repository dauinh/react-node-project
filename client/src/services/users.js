import axios from 'axios'
const baseUrl = '/api/users'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.get(`http://localhost:8080${ baseUrl }`, config)
  return response.data
}

const getByUsername = async (username) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.get(`http://localhost:8080${ baseUrl }/${ username }`, config)
  return response.data
}

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`http://localhost:8080${ baseUrl }/${ id }`, newObject, config)
  return response.data
}

const deleteUser = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`http://localhost:8080${ baseUrl }/${ id }`, config)
  return response.data
}

export default { 
  setToken, getAll, getByUsername, deleteUser, update 
} 