import { NextFunction, Request, Response } from 'express'
import UserService from '~/services/users.services'
import response from '~/constants/controller.response'
import ExceptionRes from '~/constants/exception.response'
import UserValidate from '~/validates/users.validates'
import Status from '~/constants/status'
import dataResponse from '~/constants/data.response'
import { Message } from '~/constants/message'
import { comparePassword } from '~/helper/bcrypt.password'
import exceptionHandle from '~/constants/exception.handle'
import { ExceptionType } from '~/constants/exception.types'

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
      return response(res, Status.BAD_REQUEST, validateData)
    }
    const usernameReq = req.body.username
    const passwordReq = req.body.password

    UserService.getUser(usernameReq)
      .then((result) => {
        // Check user existed to login, else create new user
        if (result) {
          comparePassword(passwordReq, result.password).then((passwordCheck) => {
            //Check password match with database
            if (passwordCheck) {
              return UserService.refreshToken(result).then((dataRes: any) => {
                if ('exception' in dataRes) return ExceptionRes(res, dataRes.exception.message)

                return response(res, Status.SUCCESS, dataResponse(dataRes.data, [Message.USER_LOGIN_SUCCESS]))
              })
            }
            return response(res, Status.BAD_REQUEST, dataResponse([], [Message.USER_LOGIN_FAILED]))
          })
        } else {
          UserService.createUser(usernameReq, passwordReq).then((result: any) => {
            if ('exception' in result) return ExceptionRes(res, result.exception.message)

            return response(res, Status.SUCCESS, dataResponse(result.data, [Message.USER_CREATE_SUCCESS]))
          })
        }
      })
      .catch((err) => ExceptionRes(res, exceptionHandle(ExceptionType.EX_USER_FIND_ONE).exception.message))
  }
}

export default new UserController()
