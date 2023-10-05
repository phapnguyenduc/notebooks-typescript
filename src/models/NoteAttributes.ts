import { Optional } from 'sequelize'

export interface NoteAttributes {
  id: number
  userId: number
  content: string
  createdAt?: Date
  updatedAt?: Date
}

export interface NoteInput extends Optional<NoteAttributes, 'id' | 'userId'> {}

export interface NoteOutput extends Required<NoteAttributes> {}
