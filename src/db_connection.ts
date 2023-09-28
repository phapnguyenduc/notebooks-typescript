import dotenv from 'dotenv'
import mysql from 'mysql'

// read file .env
dotenv.config()

const pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  debug: false,
  multipleStatements: true
});

export default pool