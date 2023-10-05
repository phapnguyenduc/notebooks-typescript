import { Response } from 'express'

export default (res: Response, status: number, data: any) => {
  return res.status(status).send(data)
}
