import mysql from '~/db_connection'

class NoteService {
  /**
   * Load note and paginate follow token each user
   *
   * @param page
   * @param token
   * @returns
   */
  public notePaginate(page: any, userId: number) {
    try {
      const perPage = 15
      const nextPage = (parseInt(page) - 1) * perPage
      const sql =
        'SELECT * FROM note as n LEFT JOIN user_note as un ON n.id = un.note_id ' +
        'WHERE un.user_id = ? ORDER BY n.updated_at DESC LIMIT ?,?'

      return new Promise((resolve, reject) => {
        mysql.query(sql, [userId, nextPage, perPage], function (err, result) {
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
  public getNoteTag(page: any, userId: number) {
    try {
      const sqlNoteTag =
        'SELECT id, GROUP_CONCAT(tag_id) as tag_id, GROUP_CONCAT(tag_name) as tag_name ' +
        'FROM (SELECT nt.note_id as id, nt.tag_id, t.name as tag_name FROM note_tag as nt LEFT JOIN ' +
        'tag as t on nt.tag_id = t.id WHERE nt.note_id IN ? ) as A GROUP BY id'

      return this.notePaginate(page, userId)?.then((result: any) => {
        return new Promise((resolve, reject) => {
          if (result.data.length > 0) {
            const sqlParam = [result.data?.map((ob: any) => ob.id)]

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
                data: result.data?.map((ob: any) => {
                  const tagMerge = dataRes.filter((o: any) => o.id === ob.id).map((tag: any) => tag.tags)[0]

                  return { ...ob, tags: !tagMerge ? [] : tagMerge }
                }),
                message: 'Load data successfully',
                status: 200
              })
            })
          } else {
            resolve({
              data: [],
              message: 'No data',
              status: 200
            })
          }
        })
      })
    } catch (error: any) {
      console.log(error.message)
    }
  }

  /**
   * Create new notes for each user and pin tag
   * @param content
   * @param tags
   * @param userId
   * @returns
   */
  public create(content: string, tags: [], userId: number) {
    try {
      const sql = 'INSERT INTO note (content) VALUES ?'
      const values = [[content]]

      return new Promise((resolve, reject) => {
        mysql.query(sql, [values], function (err, result) {
          if (err)
            reject({
              data: [],
              message: 'Failed to save content of note',
              status: 500
            })

          const insertNoteTagSql = 'INSERT INTO note_tag (note_id, tag_id) VALUES ?'
          const insertUserNoteSql = 'INSERT INTO user_note (user_id, note_id) VALUES ?'

          if (tags.length !== 0) {
            // Insert data for note_tag table
            const dataNoteTag = tags?.map((ob) => {
              return [result.insertId, ob]
            })
            mysql.query(insertNoteTagSql, [dataNoteTag], function (err, result) {
              if (err)
                reject({
                  data: [],
                  message: 'Failed to save data',
                  status: 500
                })
            })
          }

          const dataUserNote = [[userId, result.insertId]]
          mysql.query(insertUserNoteSql, [dataUserNote], function (err, result) {
            if (err)
              reject({
                data: [],
                message: 'Failed to save user of note',
                status: 500
              })
          })

          resolve({
            data: [],
            message: 'Save note success',
            status: 200
          })
        })
      })
    } catch (error: any) {
      console.log(error.message)
    }
  }

  /**
   * Update note and update note_tag table
   * @param content
   * @param tags
   * @param note_id
   */
  public update(content: string, tags: [], note_id: number, tagStatus: boolean) {
    try {
      const sql = 'UPDATE note SET content=? WHERE id=?'
      return new Promise((resolve, reject) => {
        mysql.query(sql, [content, note_id], function (err, results) {
          if (err)
            reject({
              data: [],
              message: 'Failed to save data',
              status: 500
            })

          const updateTag: { sql: string; data: any } = {
            sql: 'DELETE FROM note_tag as nt WHERE nt.note_id=?; ',
            data: [note_id]
          }

          if (tags.length !== 0) {
            updateTag.sql += 'INSERT INTO note_tag (note_id, tag_id) VALUES ?'
            updateTag.data.push(
              tags.map((tagId) => {
                return [note_id, tagId]
              })
            )
          }
          if (tagStatus)
            mysql.query(updateTag.sql, updateTag.data, function (err, result) {
              if (err) throw err
            })

          resolve({
            data: [],
            message: 'Save note success',
            status: 200
          })
        })
      })
    } catch (error: any) {
      console.log(error.message)
    }
  }

  /**
   * Delete note and note_tag, user_note
   * @param note_id
   * @returns
   */
  public delete(note_id: any) {
    try {
      const sql = 'DELETE FROM note as n WHERE n.id=? '
      return new Promise((resolve, reject) => {
        mysql.query(sql, [note_id], function (err, result) {
          if (err)
            reject({
              data: [],
              message: 'Failed to delete note',
              status: 500
            })

          resolve({
            data: [],
            message: 'Delete note success',
            status: 200
          })
        })
      })
    } catch (error: any) {
      console.log(error.message)
    }
  }
}

export default new NoteService()
