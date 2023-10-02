import NotesServices from '~/services/notes.services'

class Note {
  private static _instance: Note
  private _content: string = ''

  /**
   * @param content
   */
  constructor() {}

  static getInstance() {
    if (this._instance) {
      return this._instance
    }

    this._instance = new Note()
    return this._instance
  }

  public get content(): string {
    return this._content
  }

  public set content(value: string) {
    this._content = value
  }

  /**
   * Load note and infinite scroll
   * @param page
   * @param userId
   * @returns
   */
  public paginate(page: any, userId: number) {
    return NotesServices.getNoteTag(page, userId)?.then((result) => {
      return result
    })
  }

  /**
   * Create new notes
   * @param tags
   * @param userId
   * @returns
   */
  public create(tags: [], userId: number) {
    return NotesServices.create(this._content, tags, userId)?.then((result) => {
      return result
    })
  }

  /**
   * Update note and tag of note
   * @param tags
   * @param userId
   * @returns
   */
  public update(tags: [], note_id: number, tagStatus: boolean) {
    return NotesServices.update(this._content, tags, note_id, tagStatus)?.then((result) => {
      return result
    })
  }

  /**
   * Delete note and note_tag, user_note
   * @param tags
   * @param userId
   * @returns
   */
  public delete(note_id: any) {
    return NotesServices.delete(note_id)?.then((result) => {
      return result
    })
  }
}

export default Note
