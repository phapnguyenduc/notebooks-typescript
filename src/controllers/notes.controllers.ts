import { NextFunction, Request, Response } from 'express'
import Note from '~/models/Note'

class NoteController {
  /**
   * Load and paginate note, infinite scroll
   * @param req
   * @param res
   * @param next
   */
  async notePaginate(req: Request, res: Response, next: NextFunction) {
    const noteModel = new Note('')
    noteModel.paginate(req.params.page, req.header('x_authorization'))?.then((result: any) => {
      res.status(result.status).send(result)
    })
  }
}

export default new NoteController()
