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

  public set content(v: string) {
    this._content = v
  }

  public paginate() {}
}

export default Note
