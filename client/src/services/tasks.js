import axios from 'axios'
const baseUrl = '/api/tasks'

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

const create = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(`${ baseUrl }/${id}`, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.put(`${ baseUrl }/${id}`, newObject, config)
  return request.then(response => response.data)
}

const deleteOne = (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = axios.delete(`${ baseUrl }/${ id }`, config)
  return response.data
}

const addUser = (id, userId) => {
  const config = {
    headers: { Authorization: token },
  }
  return axios.put(`${ baseUrl }/${id}/${ userId }`, config) 
}

export default { setToken, getAll, create, update, deleteOne, addUser } 