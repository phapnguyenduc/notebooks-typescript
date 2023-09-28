import mysql from '~/db_connection'

class NoteService {
  async notePaginate(page: number, token: string) {
    try {
      const perPage = 15
      const nexPage = (page - 1) * perPage
      const sql =
        'SELECT * FROM note as n LEFT JOIN user_note as un ON n.id = un.note_id ' +
        'WHERE un.user_id = (SELECT u.id FROM user as u WHERE u.token=?)' +
        ' ORDER BY n.updated_at DESC LIMIT ?,?'

      mysql.query(sql, [token, nexPage, perPage], function (err, result) {
        if (err) throw err

        const sqlNoteTag =
          'SELECT nt.note_id as id, nt.tag_id, t.name as tag_name FROM note_tag as nt LEFT JOIN ' +
          'tag as t on nt.tag_id = t.id'

        mysql.query(sqlNoteTag, function (err, noteTagResult) {
          const dataMerge = {}
          // Convert tags to array of tag
          noteTagResult = noteTagResult.filter(function (entry) {
            if (entry.tag_name !== null && entry.tag_id !== null) {
              const previous = {
                tags: []
              }

              if (dataMerge.hasOwnProperty(entry.id)) {
                previous = dataMerge[entry.id]
                if (entry.tags === null) {
                  previous.tags = []
                } else {
                  previous.tags.push({ tag_name: '#' + entry.tag_name, tag_id: entry.tag_id })
                }

                return false
              }

              if (!Array.isArray(entry.tags)) {
                if (entry.tags === null) {
                  entry.tags = []
                } else {
                  entry.tags = [{ tag_name: '#' + entry.tag_name, tag_id: entry.tag_id }]
                }
              }
              dataMerge[entry.id] = entry
            }
            return true
          })
          result = result.map((object) => {
            return {
              ...object,
              tags: noteTagResult.filter((o) => o.id === object.id).map((tag) => tag.tags)[0]
            }
          })
          res.status(200).send({
            data: result,
            message: 'Load notes successfully'
          })
        })
      })
    } catch (error) {
      res.status(500).send({
        data: [],
        message: error.message
      })
    }
  }
}

export default new NoteService()
