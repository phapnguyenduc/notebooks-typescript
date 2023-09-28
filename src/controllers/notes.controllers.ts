import { NextFunction, Request, Response } from 'express'

class NoteController {
  async notePaginate(req: Request, res: Response, next: NextFunction) {
    res.send(req.body)
  }
}

export default new NoteController()
