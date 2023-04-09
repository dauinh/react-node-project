require('dotenv').config()

const SECRET_KEY = process.env.SECRET_KEY
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

module.exports = {
  SECRET_KEY, ADMIN_PASSWORD
}