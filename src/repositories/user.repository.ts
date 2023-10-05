import { User } from '~/models/User'
import { BaseRepository } from './base/base.repository'

class UserRepository extends BaseRepository<User> {
  /**
   * Create new user and generate token
   * @param item
   * @returns
   */
  create(item: User): Promise<User> {
    return User.create({ username: item.username, password: item.password })
  }

  findOne(username: string): Promise<User | null> {
    return User.findOne({ where: { username: username } })
  }
}

export default new UserRepository()
