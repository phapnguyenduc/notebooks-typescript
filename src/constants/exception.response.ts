import { Response } from 'express'
import Status from './status'

export default (res: Response, message: string) => {
  return res.status(Status.INTERNAL_SERVER_ERROR).send(message)
}
