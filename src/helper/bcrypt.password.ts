import bcrypt from 'bcrypt'

export function hashPassword(password: string) {
  const SALT_ROUNDS = 10
  return bcrypt.genSalt(SALT_ROUNDS).then((salt) => {
    return bcrypt.hash(password, salt)
  })
}

export function comparePassword(passwordReq: string, userPasswordSaved: string) {
  return bcrypt.compare(passwordReq, userPasswordSaved)
}
