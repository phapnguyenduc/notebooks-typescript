import jwt from 'jsonwebtoken'

class Authenticator {
  async generateToken(payload: object, secretSignature: any, tokenLife: any) {
    try {
      return await jwt.sign(
        {
          payload
        },
        secretSignature,
        {}
      )
    } catch (error) {
      console.log(`Error in generate access token:  + ${error}`)
      return null
    }
  }
  async verifyToken(token: string, secretKey: string) {
    try {
      return await jwt.verify(token, secretKey)
    } catch (error) {
      console.log(`Error in verify access token:  + ${error}`)
      return null
    }
  }
}

export default new Authenticator()
