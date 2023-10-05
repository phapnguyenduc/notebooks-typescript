import { NextFunction, Request, Response } from 'express'
import Authenticator from '~/middlewares/user.middlewares'
import jwtVariable from '../constants/jwt'
import dataResponse from '~/constants/data.response'
import Status from '~/constants/status'
import response from '~/constants/controller.response'
import { Message } from '~/constants/message'

class AuthMiddlewares {
  /**
   * Check api request
   * @param req
   * @param res
   * @param next
   * @returns
   */
  async isAuth(req: Request, res: Response, next: NextFunction) {
    const accessTokenFromHeader = req.headers.x_authorization as string
    if (!accessTokenFromHeader) {
      delete req.session.userId
      return response(res, Status.UNAUTHORIZED, dataResponse([], [Message.AUTH_NOT_FOUND]))
    }

    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || jwtVariable.accessTokenSecret
    const verified = await Authenticator.verifyToken(accessTokenFromHeader, accessTokenSecret)

    if (!verified) {
      delete req.session.userId
      return response(res, Status.UNAUTHORIZED, dataResponse([], [Message.AUTH_ACCESS_DENIED]))
    }

    const decodeToken = await Authenticator.decodeToken(accessTokenFromHeader, accessTokenSecret)
    req.session.userId = (<any>decodeToken)?.payload?.userId
    return next()
  }
}

export default new AuthMiddlewares()
