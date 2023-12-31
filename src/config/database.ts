// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

const host = process.env.DB_HOST
const username = process.env.DB_USER
const password = process.env.DB_PASSWORD
const database = process.env.DB_NAME
const port = process.env.DB_PORT
const dialect = process.env.DB_DRIVER

module.exports = {
  development: {
    username,
    password,
    database,
    host,
    port: port,
    dialect: dialect
  }
}
