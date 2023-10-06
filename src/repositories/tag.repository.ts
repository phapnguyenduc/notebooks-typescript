import { Tag } from '~/models/Tag'
import { BaseRepository } from './base/base.repository'
import { TagInput, TagOutput } from '~/models/attributes/TagAttributes'

class TagRepository extends BaseRepository<TagInput> {
  /**
   * Get all of tags
   * @returns
   */
  findAll() {
    return Tag.findAll()
  }
}

export default new TagRepository()
