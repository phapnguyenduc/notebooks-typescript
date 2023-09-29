import { NextFunction, Request, Response } from 'express'
import Tag from '~/models/Tag'

class TagController {
  /**
   * Load and paginate note, infinite scroll
   * @param req
   * @param res
   * @param next
   */
  async get(req: Request, res: Response, next: NextFunction) {
    const noteModel = new Tag()
    noteModel.getAll()?.then((result: any) => {
      res.status(result.status).send(result)
    })
  }
}

export default new TagController()
