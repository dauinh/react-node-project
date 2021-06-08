const User = require('../db/models').User

const getAll = async (request, response) => {
  const users = await User.findAll({ include: 'ToDo' })
  response.json(users)
}

const getOne = async (request, response) => {
  response.json(request.user)
}

const deleteUser = async (request, response) => {
  const id = request.params.id
  await User.destroy({ where: {id: id} })
  response.status(204).end()
}

const update = async (request, response) => {
  const body = request.body
  const id = request.params.id
  const user = {
    name: body.name,
    breed: body.breed,
    isAdmin: body.isAdmin
  }
  await User.update( user, { where: {id: id} })
  response.status(201).end()
}

module.exports = {
  getAll, getOne, deleteUser, update
}