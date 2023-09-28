import { NextFunction, Request, Response } from 'express'
import User from '../models/User'

class UserController {
  async create(req: Request, res: Response, next: NextFunction) {
    const userModel = new User(req.body.username)
    userModel.create()?.then((result) => {
      res.status(result.status).send(result.data)
    })
  }
}

export default new UserController()
