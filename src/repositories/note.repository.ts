import { Note } from '~/models/Note'
import { BaseRepository } from './base/base.repository'
import { Tag } from '~/models/Tag'

class NoteRepository extends BaseRepository<Note> {
  /**
   * Load note and paginate follow token each user
   * @param page
   * @returns
   */
  paginate(page: number, userId: number) {
    const perPage = 15
    const nextPage = (page - 1) * perPage
    return Note.findAll({ where: { userId: userId }, offset: nextPage, limit: perPage, include: Tag })
  }
}

export default new NoteRepository()
