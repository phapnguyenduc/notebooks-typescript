import mysql from '~/db_connection'

class TagService {
  /**
   * Get all of Tags
   * @returns
   */
  public getTags() {
    try {
      const sql = 'SELECT * FROM tag'
      return new Promise((resolve, reject) => {
        mysql.query(sql, function (err, result) {
          if (err)
            reject({
              data: [],
              message: 'Load data failed',
              status: 500
            })

          resolve({
            data: !result ? [] : result,
            message: 'Load tags successfully',
            status: 200
          })
        })
      })
    } catch (error: any) {
      console.log(error.message)
    }
  }
}

export default new TagService()
