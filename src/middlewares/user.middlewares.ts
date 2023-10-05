import jwt from 'jsonwebtoken'

class Authenticator {
  /**
   * Generate token when create new user
   * @param payload
   * @param secretSignature
   * @param tokenLife
   * @returns
   */
  async generateToken(payload: object, secretSignature: any, tokenLife: any) {
    try {
      return await jwt.sign(
        {
          payload
        },
        secretSignature,
        {
          expiresIn: tokenLife
        }
      )
    } catch (error) {
      console.log(`Error in generate access token:  + ${error}`)
      return null
    }
  }

  /**
   * Verify token when user call api
   * @param token
   * @param secretKey
   * @returns
   */
  async verifyToken(token: string, secretKey: string) {
    try {
      return await jwt.verify(token, secretKey)
    } catch (error) {
      console.log(`Error in verify access token:  + ${error}`)
      return null
    }
  }

  /**
   * Decode token get payload
   * @param token
   * @param secretKey
   * @returns
   */
  async decodeToken(token: string, secretKey: string) {
    try {
      return await jwt.verify(token, secretKey, {
        ignoreExpiration: true
      })
    } catch (error) {
      console.log(`Error in decode access token: ${error}`)
      return null
    }
  }
}

export default new Authenticator()
