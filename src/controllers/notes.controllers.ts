import { NextFunction, Request, Response } from 'express'
import response from '~/constants/controller.response'
import dataResponse from '~/constants/data.response'
import ExceptionRes from '~/constants/exception.response'
import { Message } from '~/constants/message'
import Status from '~/constants/status'
import NoteService from '~/services/notes.services'
import NoteValidate from '~/validates/notes.validates'

class NoteController {
  /**
   * Load and paginate note, infinite scroll
   * @param req
   * @param res
   * @param next
   */
  async notePaginate(req: Request, res: Response, next: NextFunction) {
    const pageNum = parseInt(req.params.page)
    const userId = req.session.userId as number
    NoteService.notePaginate(pageNum, userId).then((dataRes) => {
      if ('exception' in dataRes) return ExceptionRes(res, dataRes.exception.message)

      return response(res, Status.SUCCESS, dataResponse(dataRes.data, [Message.NOTE_PAGINATE_SUCCESS]))
    })
  }

  /**
   * Save note (create and update)
   * @param req
   * @param res
   * @param next
   */
  async save(req: Request, res: Response, next: NextFunction) {
    const validateData = NoteValidate.handleValidate(req)
    if (!validateData.validate) {
      return response(res, Status.BAD_REQUEST, validateData)
    }
    const userId = req.session.userId as number
    if (Number.isInteger(req.body.id)) {
      return NoteService.noteUpdate(
        req.body.content,
        req.body.tags,
        req.body.id,
        req.body.changeTagStatus,
        userId
      ).then((dataRes) => {
        if ('exception' in dataRes) return ExceptionRes(res, dataRes.exception.message)

        return response(res, Status.SUCCESS, dataResponse(dataRes.data, [Message.NOTE_UPDATE]))
      })
    }
    return NoteService.noteCreate(req.session.userId as number, req.body.tags, req.body.content).then((dataRes) => {
      if ('exception' in dataRes) return ExceptionRes(res, dataRes.exception.message)
      return response(res, Status.SUCCESS, dataResponse(dataRes.data, [Message.NOTE_CREATE]))
    })
  }

  /**
   * Delete note and note_tag, user_note
   * @param req
   * @param res
   * @param next
   */
  async delete(req: Request, res: Response, next: NextFunction) {
    const userId = req.session.userId as number
    NoteService.delete(req.params.id, userId).then((dataRes) => {
      if ('exception' in dataRes) return ExceptionRes(res, dataRes.exception.message)

      return response(res, Status.SUCCESS, dataResponse(dataRes.data, [Message.NOTE_DELETE]))
    })
  }
}

export default new NoteController()
