import { User } from '~/models/User'
import { BaseRepository } from './base/base.repository'
import mysql from '~/db_connection'
import response from '~/constants/response'
import Status from '~/constants/status'
import generateUserToken from '~/helper/generate.user.token'

class UserRepository extends BaseRepository<User> {
  /**
   * Create new user and generate token
   * @param item
   * @returns
   */
  create(item: User): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const sql = 'INSERT INTO user (username, password) VALUES ?'
        const values = [[item.username, item.password]]
        mysql.query(sql, [values], (err: any, result: any) => {
          if (err) reject(err.message)

          const dataForAccessToken = {
            userId: result.insertId,
            username: item.username
          }
          generateUserToken(dataForAccessToken).then((accessToken) => {
            resolve(
              response({ username: item.username, token: accessToken }, ['Add new user successfully'], Status.SUCCESS)
            )
          })
        })
      } catch (error: any) {
        resolve(response([], ['Create user to be got exception'], Status.INTERNAL_SERVER_ERROR))
      }
    })
  }

  /**
   * Find user by username
   * @param item
   * @returns
   */
  find(item: User): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const sql = 'SELECT * FROM user as u WHERE u.username=?'
        const values = [item.username]

        mysql.query(sql, values, function (err, result) {
          if (err) reject(response([], ['Error get user'], Status.INTERNAL_SERVER_ERROR))

          if (result.length > 0) {
            const dataForAccessToken = {
              userId: result[0].id,
              username: result[0].username
            }
            generateUserToken(dataForAccessToken).then((accessToken) => {
              const dataRes = {
                token: accessToken,
                username: result[0].username,
                password: result[0].password
              }
              resolve(response(dataRes, ['Access notes success'], Status.SUCCESS))
            })
          } else {
            resolve(response([], ['Not found'], Status.NOT_FOUND))
          }
        })
      } catch (error: any) {
        resolve(response([], ['Find user to be got exception'], Status.INTERNAL_SERVER_ERROR))
      }
    })
  }
}

export default new UserRepository()
