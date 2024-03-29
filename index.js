const http = require('http')
const express = require('express')
require('express-async-errors')
const cors = require('cors')
const logger = require('morgan')

const db = require('./db/models')
const token = require('./middleware/token')
const registerRouter = require('./routes/register')
const userRouter = require('./routes/user')
const taskRouter = require('./routes/task')

// Set up the express app
const app = express()

// Log requests to console
app.use(logger("dev"))

// MIDDLEWARE
// Parse incoming requests data
app.use(express.static('build'))
app.use(cors())
app.use(express.json())

// CONNECT TO DATABASE
db.sequelize.sync().then(result => {
  console.log('connected to database')
}).catch(error => {
  console.log(error)
})

// ROUTES
app.use('/', registerRouter)
app.use(token.tokenExtractor)
app.use('/api/users', token.userExtractor, userRouter)
app.use('/api/tasks', taskRouter)

const server = http.createServer(app)

server.listen(8080, () => {
  console.log(`🐕 Server running on port 8080 🐕`)
})