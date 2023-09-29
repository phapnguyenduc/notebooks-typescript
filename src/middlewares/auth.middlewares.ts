import { NextFunction, Request, Response } from 'express'
import Authenticator from '~/middlewares/user.middlewares'
import dotenv from 'dotenv'
import jwtVariable from '../constants/jwt'

dotenv.config()

class authMiddlewares {
  async isAuth(req: Request, res: Response, next: NextFunction) {
    const accessTokenFromHeader = req.headers.x_authorization as string
    if (!accessTokenFromHeader) {
      return res.status(401).send('Not found access token!')
    }

    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || jwtVariable.accessTokenSecret
    const verified = await Authenticator.verifyToken(accessTokenFromHeader, accessTokenSecret)

    if (!verified) {
      return res.status(401).send('Access denied !!')
    }

    return next()
  }
}

export default new authMiddlewares()
