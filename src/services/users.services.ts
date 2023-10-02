import Authenticator from '~/middlewares/user.middlewares'
import mysql from '~/db_connection'
import jwt from '~/constants/jwt'

class UserService {
  /**
   *
   * @param username
   */
  public createUser(username: string, password: string) {
    try {
      const sql = 'INSERT INTO user (username, password) VALUES ?'
      const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || jwt.accessTokenLife
      const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || jwt.accessTokenSecret

      const values = [[username, password]]
      return new Promise((resolve, reject) => {
        mysql.query(sql, [values], (err: any, result: any) => {
          if (err)
            reject({
              data: { token: '' },
              message: 'Add new user failed',
              status: 500
            })

          const dataForAccessToken = {
            userId: result.insertId,
            username: username
          }
          Authenticator.generateToken(dataForAccessToken, accessTokenSecret, accessTokenLife).then((accessToken) => {
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

  /**
   * Get user id by token verified
   * @param token
   * @returns
   */
  public getUserId(token: string) {
    try {
      const sql = 'SELECT u.id FROM user as u WHERE u.token=?'
      const values = [[token]]

      return new Promise((resolve, reject) => {
        mysql.query(sql, [values], function (err, result) {
          if (err) reject(new Error(err.message))

          resolve(result[0].id)
        })
      })
    } catch (error: any) {
      console.log(error.message)
    }
  }
}

export default new UserService()
