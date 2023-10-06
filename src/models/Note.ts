import { NoteAttributes, NoteInput, NoteOutput } from './attributes/NoteAttributes'
import { sequelize } from './index'
import { DataTypes, Model } from 'sequelize'
import { Tag } from './Tag'

export class Note extends Model<NoteAttributes, NoteInput> implements NoteAttributes {
  declare id: number
  declare userId: number
  declare content: string

  // timestamps!
  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

Note.init(
  {
    id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      get() {
        return this.getDataValue('id')
      },
      set(val: number) {
        this.setDataValue('id', val)
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      get() {
        return this.getDataValue('userId')
      },
      set(val: number) {
        this.setDataValue('userId', val)
      }
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue('content')
      },
      set(val: string) {
        this.setDataValue('content', val)
      }
    }
  },
  {
    tableName: 'notes',
    sequelize: sequelize,
    timestamps: true,
    modelName: 'note'
  }
)

Note.belongsToMany(Tag, { through: 'note-tag', foreignKey: 'note_id' })
Tag.belongsToMany(Note, { through: 'note-tag', foreignKey: 'tag_id' })
