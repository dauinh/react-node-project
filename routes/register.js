// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const registerRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../db/models').User
const Task = require('../db/models').Task
const config = require('../config')

registerRouter.post('/login', async (request, response) => {
  const body = request.body

  const user = await User.findOne({ where: { username: body.username } })

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.password)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  // token expires in 60*60 seconds, that is, in one hour
  const token = jwt.sign(
    userForToken,
    config.SECRET_KEY,
    { expiresIn: 60*60 }
  )
  
  response
    .status(200)
    .send({ token: token, username: user.username, name: user.name })
})

registerRouter.post('/register', async (request, response) => {  
  const body = request.body
  if (body.password.length < 3) {
    return response.status(400).end()
  }

  const saltRounds=10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)
  
  const newUser = {
    username: body.username,
    password: passwordHash,
    name: body.name,
    breed: body.breed
  }
    
  const savedUser = await User.create(newUser)
  const nothingTask = await Task.findOne({ where: { item: 'Nothing to do today' }})
  await savedUser.setToDo(nothingTask)
  response.status(201).send(savedUser)
})

module.exports = registerRouter