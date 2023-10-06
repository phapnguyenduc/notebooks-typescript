import { Note } from '~/models/Note'
import { BaseRepository } from './base/base.repository'
import { Tag } from '~/models/Tag'
import { NoteInput, NoteOutput } from '~/models/attributes/NoteAttributes'
import { sequelize } from '~/models'

class NoteRepository extends BaseRepository<NoteOutput> {
  /**
   * Load note and paginate follow token each user
   *
   * @param page
   * @returns
   */
  paginate(page: number, userId: number) {
    const perPage = 15
    const nextPage = (page - 1) * perPage
    return Note.findAll({
      where: { userId: userId },
      offset: nextPage,
      limit: perPage,
      include: Tag,
      order: [['updatedAt', 'DESC']]
    })
  }

  /**
   * Create new note for each user
   *
   * @param item
   * @returns
   */
  create(item: NoteInput): Promise<NoteOutput> {
    return Note.create({ userId: item.userId, content: item.content })
  }

  /**
   * Update note for each user
   *
   * @param id
   * @param item
   * @returns
   */
  update(id: number, item: NoteInput): Promise<any> {
    return Note.update({ content: item.content }, { where: { id: id, userId: item.userId } })
  }

  /**
   * Delete note for each user
   * @param id
   * @returns
   */
  delete(id: number, item: NoteInput): Promise<any> {
    return Note.destroy({ where: { id: id, userId: item.userId } })
  }

  /**
   * Add data to third table of relationship many to many (Note - Tag)
   * @param note_tags
   */
  noteTagCreate(note_tags: number[][]) {
    return sequelize.query('INSERT INTO `note-tag` (note_id, tag_id) VALUES ?', {
      raw: true,
      replacements: [note_tags]
    })
  }

  /**
   * Update note_tag table
   *
   * @param note_tags
   * @param note_id
   */
  noteTagUpdate(note_tags: number[][], note_id: number) {
    return sequelize
      .query('DELETE FROM `note-tag` WHERE note_id = ?', {
        raw: true,
        replacements: [note_id]
      })
      .then((result) => {
        if (note_tags.length > 0) {
          return this.noteTagCreate(note_tags)
        }
        return result
      })
  }
}

export default new NoteRepository()
