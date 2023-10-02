import UsersServices from '~/services/users.services'

class User {
  private static _instance: User
  private _username: string = ''

  private constructor() {}

  static getInstance() {
    if (this._instance) {
      return this._instance
    }

    this._instance = new User()
    return this._instance
  }

  get username(): string {
    return this._username
  }

  set username(value: string) {
    this._username = value
  }

  /**
   * Create new user and generate token
   */
  public create() {
    // return UsersServices.createUser(this._username)?.then((result) => {
    //   return result
    // })
  }
}

export default User
