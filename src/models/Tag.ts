import TagsServices from '~/services/tags.services'

class Tag {
  /**
   * Get all of Tags
   * @returns
   */
  public getAll() {
    return TagsServices.getTags()?.then((result) => {
      return result
    })
  }
}

export default Tag
