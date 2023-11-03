export class Message {
  static USER_CREATE_SUCCESS = 'Create new user success'
  static USER_CREATE_FAILED = 'Create new user failed'
  static USER_LOGIN_SUCCESS = 'Login successfully'
  static USER_LOGIN_FAILED = 'Wrong password. Please try again !!'

  static VALIDATE_USERNAME_EMPTY = 'Username does not empty'
  static VALIDATE_USERNAME_LENGTH = 'Username more than 6 characters'
  static VALIDATE_PASSWORD_LENGTH = 'Password more than 6 characters'
  static VALIDATE_USER_SUCCESS = 'User validates success'

  static VALIDATE_NOTE_CONTENT_EMPTY = 'Note content does not empty'

  static NOTE_CREATE = 'Create new note success'
  static NOTE_UPDATE = 'Update note success'
  static NOTE_DELETE = 'Delete note success'
  static NOTE_PAGINATE_SUCCESS = 'Get note data success'

  static TAG_FIND_ALL = 'Get all of tags success'

  static EX_USER_CREATE = 'Create new user to be got exception'
  static EX_USER_FIND_ONE = 'Find one user to be got exception'
  static EX_BCRYPT = 'Exception during bcrypt, hash password'
  static EX_GENERATE_TOKEN = 'Exception during generate token.'
  static EX_NOTE_PAGINATE = 'Paginate note got exception.'
  static EX_NOTE_CREATE = 'Note create got exception.'
  static EX_NOTE_UPDATE = 'Note update got exception.'
  static EX_NOTE_DELETE = 'Note delete got exception.'
  static EX_NOTE_TAG_CREATE = 'Create new record on note_tag table got exception.'
  static EX_NOTE_TAG_UPDATE = 'Update on note_tag table got exception.'
  static EX_TAG_FIND_ALL = 'Get all of tags to be got exception.'
  static EX_OTHER = 'Other exception'

  static AUTH_NOT_FOUND = 'Not found token ~~~'
  static AUTH_ACCESS_DENIED = 'Access denied ~~'
}
