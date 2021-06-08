const jwt = require('jsonwebtoken')
const config = require('../config')
const User = require('../db/models').User

const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, config.SECRET_KEY)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  request.user = await User.findByPk(decodedToken.id, { include: 'ToDo' })
  next()
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }
  next()
}

module.exports = {
  userExtractor, tokenExtractor
}