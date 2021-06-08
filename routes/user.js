// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const userRouter = require('express').Router()
const users = require('../middleware/users')

userRouter.get('/', users.getAll)
userRouter.get('/:username', users.getOne)
userRouter.delete('/:id', users.deleteUser)
userRouter.put('/:id', users.update)

module.exports = userRouter