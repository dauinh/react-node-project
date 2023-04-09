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
  const response = await axios.get(`http://localhost:8080${ baseUrl }`, config)
  return response.data
}

const create = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(`http://localhost:8080${ baseUrl }/${id}`, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.put(`http://localhost:8080${ baseUrl }/${id}`, newObject, config)
  return request.then(response => response.data)
}

const deleteOne = (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = axios.delete(`http://localhost:8080${ baseUrl }/${ id }`, config)
  return response.data
}

const addUser = (id, userId) => {
  const config = {
    headers: { Authorization: token },
  }
  return axios.put(`http://localhost:8080${ baseUrl }/${id}/${ userId }`, config) 
}

export default { setToken, getAll, create, update, deleteOne, addUser } 