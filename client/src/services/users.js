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
  const response = await axios.get(baseUrl, config)
  return response.data
}

const getByUsername = async (username) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.get(`${ baseUrl }/${ username }`, config)
  return response.data
}

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${ baseUrl }/${ id }`, newObject, config)
  return response.data
}

const deleteUser = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${ baseUrl }/${ id }`, config)
  return response.data
}

export default { 
  setToken, getAll, getByUsername, deleteUser, update 
} 