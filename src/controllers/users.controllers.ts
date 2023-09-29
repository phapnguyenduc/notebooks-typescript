import { NextFunction, Request, Response } from 'express'
import User from '../models/User'

class UserController {
  /**
   * Create new user and generate token
   * @param req
   * @param res
   * @param next
   */
  async create(req: Request, res: Response, next: NextFunction) {
    const userModel = User.getInstance()
    userModel.username = req.body.username
    userModel.create()?.then((result: any) => {
      res.status(result.status).send(result.data)
    })
  }

  /**
   * Get user by token to be saved on local storage
   * @param req
   * @param res
   * @param next
   */
  async get(req: Request, res: Response, next: NextFunction) {}
}

export default new UserController()
