// import TagsServices from '~/services/tags.services'

// class Tag {
//   /**
//    * Get all of Tags
//    * @returns
//    */
//   public getAll() {
//     return TagsServices.getTags()?.then((result) => {
//       return result
//     })
//   }
// }

// export default Tag

import { TagAttributes, TagInput, TagOutput } from './TagAttributes'
import sequelizeConnection from '~/db_connection'
import { DataTypes, Model } from 'sequelize'

export class Tag extends Model<TagAttributes, TagInput> implements TagAttributes {
  declare id: number
  declare name: string

  // timestamps!
  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

Tag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      get() {
        return this.getDataValue('id')
      },
      set(val: number) {
        this.setDataValue('id', val)
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      get() {
        return this.getDataValue('name')
      },
      set(val: string) {
        this.setDataValue('name', val)
      }
    }
  },
  {
    tableName: 'tags',
    sequelize: sequelizeConnection,
    timestamps: true,
    modelName: 'tag'
  }
)
