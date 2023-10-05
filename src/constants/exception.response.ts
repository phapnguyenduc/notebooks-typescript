import { Response } from 'express'
import Status from './status'
import dataResponse from './data.response'

export default (res: Response, message: string) => {
  return res.status(Status.BAD_REQUEST).send(dataResponse([], [message]))
}
