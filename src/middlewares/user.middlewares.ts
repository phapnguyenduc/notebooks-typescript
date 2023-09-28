import jwt from 'jsonwebtoken'
import promisify from 'util'

const sign = promisify.promisify(jwt.sign).bind(jwt)
const verify = promisify.promisify(jwt.verify).bind(jwt)

class Authenticator {
  async generateToken(payload: object, secretSignature: any, tokenLife: any) {
    try {
      return await sign(
        {
          payload
        },
        secretSignature,
        {
          algorithm: 'none',
          expiresIn: tokenLife
        }
      )
    } catch (error) {
      console.log(`Error in generate access token:  + ${error}`)
      return null
    }
  }
  async verifyToken(token: string) {
    try {
      return await verify(token)
    } catch (error) {
      console.log(`Error in verify access token:  + ${error}`)
      return null
    }
  }
}

export default new Authenticator()
