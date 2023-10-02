import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import session from 'express-session'
import dotenv from 'dotenv'
import sessionVariable from './constants/session'

declare module 'express-session' {
  interface SessionData {
    userId: number
  }
}

class App {
  public app: express.Application

  constructor() {
    this.app = express()
    dotenv.config()
    this.config()
  }

  private config(): void {
    const sessionMiddleware = session({
      secret: process.env.SESSION_SECRET || sessionVariable.sessionSecret,
      resave: true,
      saveUninitialized: true
    })
    this.app.use(cors())
    this.app.use(bodyParser.urlencoded({ extended: false }))
    this.app.use(express.json())
    this.app.use(sessionMiddleware)
  }
}

export default new App().app
