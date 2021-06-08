const Task = require('../db/models').Task
const User = require('../db/models').User

const getAll = async (request, response) => {
  const tasks = await Task.findAll({ include: 'Author' })
  response.status(200).send(tasks)
}

const create = async (request, response) => {
  const body = request.body
  const id = request.params.userId
  const newTask = {
    item: body.item
  }
  const user = await User.findOne({ where: { id: id }, include: 'ToDo' })
  const nothingTask = await Task.findOne({ where: { item: 'Nothing to do today' } })

  if (await user.countToDo() === 1 && await user.hasToDo(nothingTask)) {
    console.log('set task to null')
    await user.setToDo(null)
  }

  const created = await user.createToDo(newTask)
  response.status(201).send(created)
}

const deleteTask = async (request, response) => {
  const id = request.params.id
  await Task.destroy({ where: {id: id} })
  response.status(204).end()
}

const update = async (request, response) => {
  const body = request.body
  const id = request.params.id
  const task = { item: body.item }

  const saved = await Task.update( task, { where: {id: id} })
  response.status(201).send(saved)
}

const addUser = async (request, response) => {
  const id = request.params.id
  const userId = request.params.userId

  const user = await User.findOne({ where: { id: userId } })
  const task = await Task.findOne({ where: { id: id } })

  await task.addAuthor(user)
  response.status(201).end()
}

module.exports = {
  getAll, create, deleteTask, update, addUser
}