import { User } from '~/models/User'
import { BaseRepository } from './base/base.repository'
import { UserInput, UserOutput } from '~/models/attributes/UserAttributes'

class UserRepository extends BaseRepository<UserInput> {
  /**
   * Create new user and generate token
   *
   * @param item
   * @returns
   */
  create(item: UserInput): Promise<UserOutput> {
    return User.create({ username: item.username, password: item.password })
  }

  /**
   * Check user existed in database
   *
   * @param username
   * @returns
   */
  findOne(username: string): Promise<UserOutput | null> {
    return User.findOne({ where: { username: username } })
  }
}

export default new UserRepository()
