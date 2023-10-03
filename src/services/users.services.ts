import UserRepository from '~/repositories/user.repository'
import { User } from '~/models/User'

class UserService {
  /**
   *
   * @param username
   */
  public createUser(username: string, password: string) {
    return UserRepository.create(new User(username, password))
  }

  /**
   * Get user id by username
   * @param token
   * @returns
   */
  public getUser(username: string) {
    return UserRepository.find(new User(username))
  }
}

export default new UserService()
