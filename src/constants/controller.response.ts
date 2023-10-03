import { Response } from 'express'

export default (res: Response, data: any) => {
  return res.status(data.status).send(data)
}
