import { Request } from 'express'
import { body, validationResult } from 'express-validator'
import dataRes from '~/constants/data.response'
import { Message } from '~/constants/message'

class UserValidate {
  validate() {
    return [
      body('username', Message.VALIDATE_USERNAME_EMPTY).notEmpty(),
      body('username', Message.VALIDATE_USERNAME_LENGTH).isLength({ min: 6 }),
      body('password', Message.VALIDATE_PASSWORD_LENGTH).isLength({ min: 6 })
    ]
  }

  handleValidate(req: Request) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const messageError = errors.array().map((err) => {
        return err.msg
      })
      return dataRes([], messageError, false)
    }
    return dataRes([], [Message.VALIDATE_USER_SUCCESS], true)
  }
}

export default new UserValidate()
