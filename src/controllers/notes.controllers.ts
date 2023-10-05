import { NextFunction, Request, Response } from 'express'
import response from '~/constants/controller.response'
import dataResponse from '~/constants/data.response'
import ExceptionRes from '~/constants/exception.response'
import { Message } from '~/constants/message'
import Status from '~/constants/status'
import NoteService from '~/services/notes.services'

class NoteController {
  /**
   * Load and paginate note, infinite scroll
   * @param req
   * @param res
   * @param next
   */
  async notePaginate(req: Request, res: Response, next: NextFunction) {
    // const noteModel = Note.getInstance()
    // noteModel.paginate(req.params.page, req.session.userId as number)?.then((result: any) => {
    //   res.status(result.status).send(result)
    // })
    const pageNum = parseInt(req.params.page)
    const userId = req.session.userId as number
    NoteService.notePaginate(pageNum, userId).then((dataRes) => {
      if ('exception' in dataRes) return ExceptionRes(res, dataRes.exception.message)

      return response(res, Status.SUCCESS, dataResponse(dataRes.data, [Message.NOTE_PAGINATE_SUCCESS]))
    })
  }

  //   /**
  //    * Save note (create and update)
  //    * @param req
  //    * @param res
  //    * @param next
  //    */
  //   async save(req: Request, res: Response, next: NextFunction) {
  //     const noteModel = Note.getInstance()
  //     noteModel.content = req.body.content
  //     if (Number.isInteger(req.body.id)) {
  //       noteModel.update(req.body.tags, req.body.id, req.body.changeTagStatus)?.then((result: any) => {
  //         res.status(result.status).send(result)
  //       })
  //     }
  //     if (!req.body.content === false && !Number.isInteger(req.body.id)) {
  //       noteModel.create(req.body.tags, req.session.userId as number)?.then((result: any) => {
  //         res.status(result.status).send(result)
  //       })
  //     }
  //   }

  //   /**
  //    * Delete note and note_tag, user_note
  //    * @param req
  //    * @param res
  //    * @param next
  //    */
  //   async delete(req: Request, res: Response, next: NextFunction) {
  //     const noteModel = Note.getInstance()
  //     noteModel.delete(req.params.id)?.then((result: any) => {
  //       res.status(result.status).send(result)
  //     })
  //   }
}

export default new NoteController()
