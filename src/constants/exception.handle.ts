import { ExceptionType } from './exception.types'
import { Message } from './message'

export default (type: string) => {
  const exceptionRes = {
    exception: {
      type: '',
      message: ''
    }
  }

  switch (type) {
    case ExceptionType.EX_USER_CREATE:
      exceptionRes.exception.type = ExceptionType.EX_USER_CREATE
      exceptionRes.exception.message = Message.EX_USER_CREATE
      break

    case ExceptionType.EX_USER_FIND_ONE:
      exceptionRes.exception.type = ExceptionType.EX_USER_FIND_ONE
      exceptionRes.exception.message = Message.EX_USER_FIND_ONE
      break

    case ExceptionType.EX_BCRYPT:
      exceptionRes.exception.type = ExceptionType.EX_BCRYPT
      exceptionRes.exception.message = Message.EX_BCRYPT
      break

    case ExceptionType.EX_GENERATE_TOKEN:
      exceptionRes.exception.type = ExceptionType.EX_GENERATE_TOKEN
      exceptionRes.exception.message = Message.EX_GENERATE_TOKEN
      break

    case ExceptionType.EX_NOTE_PAGINATE:
      exceptionRes.exception.type = ExceptionType.EX_NOTE_PAGINATE
      exceptionRes.exception.message = Message.EX_NOTE_PAGINATE
      break

    default:
      exceptionRes.exception.type = ExceptionType.EX_OTHER
      exceptionRes.exception.message = Message.EX_OTHER
      break
  }

  return exceptionRes
}
