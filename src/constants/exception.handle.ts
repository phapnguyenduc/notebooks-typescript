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

    case ExceptionType.EX_NOTE_CREATE:
      exceptionRes.exception.type = ExceptionType.EX_NOTE_CREATE
      exceptionRes.exception.message = Message.EX_NOTE_CREATE
      break

    case ExceptionType.EX_NOTE_UPDATE:
      exceptionRes.exception.type = ExceptionType.EX_NOTE_UPDATE
      exceptionRes.exception.message = Message.EX_NOTE_UPDATE
      break

    case ExceptionType.EX_NOTE_DELETE:
      exceptionRes.exception.type = ExceptionType.EX_NOTE_DELETE
      exceptionRes.exception.message = Message.EX_NOTE_DELETE
      break

    case ExceptionType.EX_NOTE_TAG_CREATE:
      exceptionRes.exception.type = ExceptionType.EX_NOTE_TAG_CREATE
      exceptionRes.exception.message = Message.EX_NOTE_UPDATE
      break

    case ExceptionType.EX_NOTE_TAG_UPDATE:
      exceptionRes.exception.type = ExceptionType.EX_NOTE_TAG_UPDATE
      exceptionRes.exception.message = Message.EX_NOTE_TAG_UPDATE
      break

    case ExceptionType.EX_TAG_FIND_ALL:
      exceptionRes.exception.type = ExceptionType.EX_TAG_FIND_ALL
      exceptionRes.exception.message = Message.EX_TAG_FIND_ALL
      break

    default:
      exceptionRes.exception.type = ExceptionType.EX_OTHER
      exceptionRes.exception.message = Message.EX_OTHER
      break
  }

  return exceptionRes
}
