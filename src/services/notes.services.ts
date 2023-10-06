import dataResponse from '~/constants/data.response'
import exceptionHandle from '~/constants/exception.handle'
import { ExceptionType } from '~/constants/exception.types'
import { Note } from '~/models/Note'
import noteRepository from '~/repositories/note.repository'

class NoteService {
  /**
   * Load note and paginate follow token each user
   *
   * @param page
   * @param token
   * @returns
   */
  public notePaginate(page: number, userId: number) {
    return noteRepository
      .paginate(page, userId)
      .then((result) => {
        return dataResponse(result)
      })
      .catch((err) => exceptionHandle(ExceptionType.EX_NOTE_PAGINATE))
  }

  /**
   * Create new note
   *
   * @param userId
   * @param tags
   * @param content
   * @returns
   */
  public noteCreate(userId: number, tags: [], content: string) {
    return noteRepository
      .create(Note.build({ userId: userId, content: content }))
      .then((result: any) => {
        if (tags.length !== 0) {
          const noteTag = tags.map((tagId) => {
            return [result.id, tagId]
          })
          noteRepository.noteTagCreate(noteTag).catch((err) => exceptionHandle(ExceptionType.EX_NOTE_TAG_CREATE))
        }
        return dataResponse(result)
      })
      .catch((err) => exceptionHandle(ExceptionType.EX_NOTE_CREATE))
  }

  /**
   * Update note and update note_tag table
   *
   * @param content
   * @param tags
   * @param note_id
   * @param tagStatus
   * @returns
   */
  public noteUpdate(content: string, tags: [], note_id: number, tagStatus: boolean, userId: number) {
    return noteRepository
      .update(note_id, Note.build({ userId: userId, content: content }))
      .then((result) => {
        if (tagStatus) {
          const noteTag = tags.map((tagId) => {
            return [note_id, tagId]
          })
          noteRepository
            .noteTagUpdate(noteTag, note_id)
            .catch((err) => exceptionHandle(ExceptionType.EX_NOTE_TAG_UPDATE))
        }
        return dataResponse(result)
      })
      .catch((err) => exceptionHandle(ExceptionType.EX_NOTE_UPDATE))
  }

  /**
   * Delete note and note_tag, user_note
   * @param note_id
   * @returns
   */
  public delete(note_id: any, userId: number) {
    return noteRepository
      .delete(note_id, Note.build({ userId: userId, content: '' }))
      .then((result) => {
        return dataResponse(result)
      })
      .catch((err) => exceptionHandle(ExceptionType.EX_NOTE_DELETE))
  }
}

export default new NoteService()
