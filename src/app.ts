import express from 'express'
import bodyParser from 'body-parser'

class App {
  public app: express.Application

  constructor() {
    this.app = express()
    this.config()
  }

  private config(): void {
    this.app.use(bodyParser.urlencoded({ extended: false }))
    this.app.use(express.json());
  }
}

export default new App().app
