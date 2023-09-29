import NotesServices from '~/services/notes.services'

class Note {
  private _content: string

  /**
   * @param content
   */
  constructor(content: string) {
    this._content = content
  }

  public get content(): string {
    return this._content
  }

  public set content(value: string) {
    this._content = value
  }

  public paginate(page: any, token: any) {
    return NotesServices.getNoteTag(page, token)?.then((result) => {
      return result
    })
  }
}

export default Note
