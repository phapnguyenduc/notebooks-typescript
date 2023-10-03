import { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import UserService from '~/services/users.services'
import response from '~/constants/controller.response'
import ExceptionRes from '~/constants/exception.response'
import UserValidate from '~/validates/users.validates'
import Status from '~/constants/status'

const SALT_ROUNDS = 10

class UserController {
  /**
   * Login or create new user and generate token
   * @param req
   * @param res
   * @param next
   */
  async createOrLogin(req: Request, res: Response, next: NextFunction) {
    const validateData = UserValidate.handleValidate(req)
    if (!validateData.validate) {
      return response(res, validateData)
    }
    const usernameReq = req.body.username
    const passwordReq = req.body.password
    //Get user by username
    UserService.getUser(usernameReq)?.then((result: any) => {
      //Username existed on database, continue compare password
      if (result.status === Status.SUCCESS) {
        bcrypt
          .compare(passwordReq, result.data.password)
          .then((resultCompare) => {
            delete result.data.password
            if (resultCompare) {
              return response(res, result)
            }
            delete result.data.token
            result.message = ['Wrong password. Please try again !!']
            result.validate = false
            return response(res, result)
          })
          .catch((err) => ExceptionRes(res, 'Compare password failed'))
      } else {
        bcrypt
          .genSalt(SALT_ROUNDS)
          .then((salt) => {
            return bcrypt.hash(passwordReq, salt)
          })
          .then((password) => {
            UserService.createUser(usernameReq, password)?.then((result: any) => {
              return response(res, result)
            })
          })
          .catch((err) => ExceptionRes(res, 'Hash password failed'))
      }
    })
  }
}

export default new UserController()
