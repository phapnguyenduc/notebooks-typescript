import Authenticator from '~/middlewares/user.middlewares'
import dotenv from 'dotenv'
import mysql from '~/db_connection'
import jwt from '~/constants/jwt'

dotenv.config()

class UserService {
  /**
   *
   * @param username
   */
  public createUser(username: string) {
    try {
      const sql = 'INSERT INTO user (username, token) VALUES ?'
      const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || jwt.accessTokenLife
      const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || jwt.accessTokenSecret
      const dataForAccessToken = {
        username: username
      }

      return Authenticator.generateToken(dataForAccessToken, accessTokenSecret, accessTokenLife).then((accessToken) => {
        const values = [[username, accessToken]]

        return new Promise((resolve, reject) => {
          mysql.query(sql, [values], (err: any, result: any) => {
            if (err)
              reject({
                data: { token: '' },
                message: 'Add new user failed',
                status: 500
              })

            resolve({
              data: { token: accessToken },
              message: 'Add new user successfully',
              status: 200
            })
          })
        })
      })
    } catch (error: any) {
      console.log(error.message)
    }
  }
}

export default new UserService()
