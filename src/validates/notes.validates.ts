import { Request } from 'express'
import { body, validationResult } from 'express-validator'
import dataRes from '~/constants/data.response'
import { Message } from '~/constants/message'

class NoteValidate {
  validate() {
    return [body('content', Message.VALIDATE_NOTE_CONTENT_EMPTY).notEmpty()]
  }

  handleValidate(req: Request) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const messageError = errors.array().map((err) => {
        return err.msg
      })
      return dataRes([], messageError, false)
    }
    return dataRes([], [], true)
  }
}

export default new NoteValidate()
