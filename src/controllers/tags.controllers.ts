import { NextFunction, Request, Response } from 'express'
import exceptionRes from '~/constants/exception.response'
import response from '~/constants/controller.response'
import TagService from '~/services/tags.services'
import Status from '~/constants/status'
import dataResponse from '~/constants/data.response'
import { Message } from '~/constants/message'

class TagController {
  /**
   * Load and paginate note, infinite scroll
   * @param req
   * @param res
   * @param next
   */
  async get(req: Request, res: Response, next: NextFunction) {
    TagService.getTags().then((dataRes) => {
      if ('exception' in dataRes) return exceptionRes(res, dataRes.exception.message)

      return response(res, Status.SUCCESS, dataResponse(dataRes.data, [Message.TAG_FIND_ALL]))
    })
  }
}

export default new TagController()
