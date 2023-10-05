import UserRepository from '~/repositories/user.repository'
import { User } from '~/models/User'
import exceptionHandle from '~/constants/exception.handle'
import { ExceptionType } from '~/constants/exception.types'
import generateUserToken from '~/helper/generate.user.token'
import dataResponse from '~/constants/data.response'
import { hashPassword } from '~/helper/bcrypt.password'

class UserService {
  /**
   * Create new user
   * @param username
   */
  public createUser(username: string, password: string) {
    const userModel = new User()
    userModel.username = username
    return hashPassword(password)
      .then((passwordHashed) => {
        userModel.password = passwordHashed
        return UserRepository.create(userModel)
          .then((result) => {
            return this.refreshToken(result)
          })
          .catch((err) => exceptionHandle(ExceptionType.EX_USER_CREATE))
      })
      .catch((err) => exceptionHandle(ExceptionType.EX_BCRYPT))
  }

  /**
   * Get user by username
   * @param token
   * @returns
   */
  public getUser(username: string) {
    return UserRepository.findOne(username)
  }

  /**
   * Refresh token when user create or login to access note
   * @param result
   * @returns
   */
  public refreshToken(result: any): any {
    const dataForAccessToken = {
      userId: result.id,
      username: result.username
    }
    return generateUserToken(dataForAccessToken)
      .then((accessToken) => {
        return dataResponse({ username: result.username, token: accessToken })
      })
      .catch((err) => exceptionHandle(ExceptionType.EX_GENERATE_TOKEN))
  }
}

export default new UserService()
