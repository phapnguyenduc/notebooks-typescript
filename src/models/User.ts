import { UserAttributes, UserInput, UserOutput } from './attributes/UserAttributes'
import { sequelize } from './index'
import { DataTypes, Model } from 'sequelize'
import { Note } from './Note'

export class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  declare id: number
  declare username: string
  declare password: string

  // timestamps!
  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

User.init(
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
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      get() {
        return this.getDataValue('username')
      },
      set(val: string) {
        this.setDataValue('username', val)
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue('password')
      },
      set(val: string) {
        this.setDataValue('password', val)
      }
    }
  },
  {
    tableName: 'users',
    sequelize: sequelize,
    timestamps: true,
    modelName: 'user'
  }
)

User.hasMany(Note, { as: 'notes' })
Note.belongsTo(User, { as: 'users', foreignKey: 'userId' })
