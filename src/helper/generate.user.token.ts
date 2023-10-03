import jwt from '~/constants/jwt'
import Authenticator from '~/middlewares/user.middlewares'

export default (dataForAccessToken: { userId: number; username: string }) => {
  const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || jwt.accessTokenLife
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || jwt.accessTokenSecret
  return Authenticator.generateToken(dataForAccessToken, accessTokenSecret, accessTokenLife)
}
