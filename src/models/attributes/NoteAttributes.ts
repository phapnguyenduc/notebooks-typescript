import { Optional } from 'sequelize'

export interface NoteAttributes {
  id: number
  userId: number
  content: string
  createdAt?: Date
  updatedAt?: Date
}

export interface NoteInput extends Optional<NoteAttributes, 'id'> {}

export interface NoteOutput extends Required<NoteAttributes> {}
