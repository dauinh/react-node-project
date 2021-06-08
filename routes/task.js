// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const taskRouter = require('express').Router()
const tasks = require('../middleware/tasks')

taskRouter.get('/', tasks.getAll)
taskRouter.post('/:userId', tasks.create)
taskRouter.delete('/:id', tasks.deleteTask)
taskRouter.put('/:id', tasks.update)
taskRouter.put('/:id/:userId', tasks.addUser)

module.exports = taskRouter