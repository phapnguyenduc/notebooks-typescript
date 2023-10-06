import dataResponse from '~/constants/data.response'
import exceptionHandle from '~/constants/exception.handle'
import { ExceptionType } from '~/constants/exception.types'
import TagRepository from '~/repositories/tag.repository'

class TagService {
  /**
   * Get all of Tags
   *
   * @returns
   */
  public getTags() {
    return TagRepository.findAll()
      .then((result) => {
        return dataResponse(result)
      })
      .catch((err) => exceptionHandle(ExceptionType.EX_TAG_FIND_ALL))
  }
}

export default new TagService()
