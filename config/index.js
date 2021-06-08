require('dotenv').config()

const PORT = process.env.PORT
const SECRET_KEY = process.env.SECRET_KEY
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

module.exports = {
  PORT, SECRET_KEY, ADMIN_PASSWORD
}