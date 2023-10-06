import { Optional } from 'sequelize'

export interface UserAttributes {
  id: number
  username: string
  password: string
  createdAt?: Date
  updatedAt?: Date
}

export interface UserInput extends Optional<UserAttributes, 'id'> {}

export interface UserOutput extends Required<UserAttributes> {}
