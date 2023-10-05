import { Optional } from 'sequelize'

export interface TagAttributes {
  id: number
  name: string
  createdAt?: Date
  updatedAt?: Date
}

export interface TagInput extends Optional<TagAttributes, 'id'> {}

export interface TagOutput extends Required<TagAttributes> {}
