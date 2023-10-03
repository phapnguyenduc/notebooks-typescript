import { Request } from 'express'
import { body, validationResult } from 'express-validator'
import response from '~/constants/response'
import Status from '~/constants/status'

class UserValidate {
  validate() {
    return [
      body('username', 'Username does not empty').notEmpty(),
      body('username', 'Username more than 6 characters').isLength({ min: 6 }),
      body('password', 'Password more than 6 characters').isLength({ min: 6 })
    ]
  }

  handleValidate(req: Request) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const messageError = errors.array().map((err) => {
        return err.msg
      })
      return response([], messageError, Status.SUCCESS, false)
    }
    return response([], ['User validates success'], Status.SUCCESS, true)
  }
}

export default new UserValidate()
