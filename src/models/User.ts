import UsersServices from '~/services/users.services'

class User {
  private _username: string

  /**
   *
   * @param username
   */
  constructor(username: string) {
    this._username = username
  }

  public get username(): string {
    return this._username
  }

  set username(value: string) {
    this._username = value
  }

  /**
   * Create new user and generate token
   */
  public create() {
    return UsersServices.createUser(this._username)?.then((result) => {
      return result as { data: object; message: string; status: number }
    })
  }
}

export default User
