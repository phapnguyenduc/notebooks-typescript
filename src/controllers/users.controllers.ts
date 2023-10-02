import { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import UserService from '~/services/users.services'

class UserController {
  /**
   * Create new user and generate token
   * @param req
   * @param res
   * @param next
   */
  async create(req: Request, res: Response, next: NextFunction) {
    const saltRounds = 10
    bcrypt
      .genSalt(saltRounds)
      .then((salt) => {
        return bcrypt.hash(req.body.password, salt)
      })
      .then((hash) => {
        UserService.createUser(req.body.username, hash)?.then((result) => {
          console.log(result)
        })
        // bcrypt
        //   .compare('123456789', hash)
        //   .then((res) => {
        //     console.log(res) // return true
        //   })
        //   .catch((err) => console.error(err.message))
      })
      .catch((err) => console.error(err.message))
    // console.log(password)

    // const userModel = User.getInstance()
    // userModel.username = req.body.username
    // userModel.create()?.then((result: any) => {
    //   res.status(result.status).send(result.data)
    // })
  }
}

export default new UserController()
