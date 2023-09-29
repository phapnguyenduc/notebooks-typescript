import mysql from '~/db_connection'

class NoteService {
  /**
   * Load note and paginate follow token each user
   *
   * @param page
   * @param token
   * @returns
   */
  public notePaginate(page: any, token: any) {
    try {
      const perPage = 15
      const nexPage = (parseInt(page) - 1) * perPage
      const sql =
        'SELECT * FROM note as n LEFT JOIN user_note as un ON n.id = un.note_id ' +
        'WHERE un.user_id = (SELECT u.id FROM user as u WHERE u.token=?)' +
        ' ORDER BY n.updated_at DESC LIMIT ?,?'

      return new Promise((resolve, reject) => {
        mysql.query(sql, [token, nexPage, perPage], function (err, result) {
          if (err)
            reject({
              data: [],
              message: 'Load data failed',
              status: 500
            })

          resolve({
            data: !result ? [] : result,
            message: 'Load data successfully',
            status: 200
          })
        })
      })
    } catch (error: any) {
      console.log(error.message)
    }
  }

  /**
   * Get tag each note follow user's token
   *
   * @returns
   */
  public getNoteTag(page: any, token: any) {
    try {
      const sqlNoteTag =
        'SELECT id, GROUP_CONCAT(tag_id) as tag_id, GROUP_CONCAT(tag_name) as tag_name ' +
        'FROM (SELECT nt.note_id as id, nt.tag_id, t.name as tag_name FROM note_tag as nt LEFT JOIN ' +
        'tag as t on nt.tag_id = t.id WHERE nt.note_id IN ? ) as A GROUP BY id'

      return this.notePaginate(page, token)?.then((result: any) => {
        if (result.length > 0) {
          return new Promise((resolve, reject) => {
            const sqlParam = [result?.map((ob: any) => ob.id)]

            mysql.query(sqlNoteTag, [sqlParam], (err, noteTagResult) => {
              if (err)
                reject({
                  data: [],
                  message: 'Load data failed',
                  status: 500
                })

              const dataRes = noteTagResult.map((ob: any) => {
                const tag_name = ob.tag_name.split(',')
                const tag_id = ob.tag_id.split(',')
                return {
                  id: ob.id,
                  tags: tag_name.map((v: any, k: any) => {
                    return { tag_name: '#' + v, tag_id: parseInt(tag_id[k]) }
                  })
                }
              })

              resolve({
                data: result?.map((ob: any) => {
                  const tagMerge = dataRes.filter((o: any) => o.id === ob.id).map((tag: any) => tag.tags)[0]

                  return { ...ob, tags: !tagMerge ? [] : tagMerge }
                }),
                message: 'Load data successfully',
                status: 200
              })
            })
          })
        }
        return {
          data: [],
          message: 'No data',
          status: 200
        }
      })
    } catch (error: any) {
      console.log(error.message)
    }
  }

  public create(content: string, tags: [], token: string) {
    try {
      const sql = 'INSERT INTO note (content) VALUES ?'
      const values = [[content]]
      mysql.query(sql, [values], function (err, result) {
        if (err) throw err

        const insertNoteTagSql = 'INSERT INTO note_tag (note_id, tag_id) VALUES ?'
        const insertUserNoteSql = 'INSERT INTO user_note (user_id, note_id) VALUES ?'

        if (tags.length !== 0) {
          // Insert data for note_tag table
          const dataNoteTag = tags?.map((ob) => {
            return [result.insertId, ob]
          })
          mysql.query(insertNoteTagSql, [dataNoteTag], function (err, result) {
            if (err) throw err
          })
        }
        // User.getUserId(req.header('x_authorization')).then((userId) => {
        //   const dataUserNote = [[userId, result.insertId]]

        //   mysql.query(insertUserNoteSql, [dataUserNote], function (err, result) {
        //     if (err) throw err
        //   })
        // })
      })
    } catch (error: any) {
      console.log(error.message)
    }
  }
}

export default new NoteService()
