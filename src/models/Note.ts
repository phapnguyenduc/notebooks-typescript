// import NotesServices from '~/services/notes.services'

// class Note {
//   private static _instance: Note
//   private _content: string = ''

//   /**
//    * @param content
//    */
//   constructor() {}

//   static getInstance() {
//     if (this._instance) {
//       return this._instance
//     }

//     this._instance = new Note()
//     return this._instance
//   }

//   public get content(): string {
//     return this._content
//   }

//   public set content(value: string) {
//     this._content = value
//   }

//   /**
//    * Load note and infinite scroll
//    * @param page
//    * @param userId
//    * @returns
//    */
//   public paginate(page: any, userId: number) {
//     return NotesServices.getNoteTag(page, userId)?.then((result) => {
//       return result
//     })
//   }

//   /**
//    * Create new notes
//    * @param tags
//    * @param userId
//    * @returns
//    */
//   public create(tags: [], userId: number) {
//     return NotesServices.create(this._content, tags, userId)?.then((result) => {
//       return result
//     })
//   }

//   /**
//    * Update note and tag of note
//    * @param tags
//    * @param userId
//    * @returns
//    */
//   public update(tags: [], note_id: number, tagStatus: boolean) {
//     return NotesServices.update(this._content, tags, note_id, tagStatus)?.then((result) => {
//       return result
//     })
//   }

//   /**
//    * Delete note and note_tag, user_note
//    * @param tags
//    * @param userId
//    * @returns
//    */
//   public delete(note_id: any) {
//     return NotesServices.delete(note_id)?.then((result) => {
//       return result
//     })
//   }
// }

// export default Note

// export class User {
//   private _username: string
//   private _password: string

//   public constructor(username: string = '', password: string = '') {
//     this._username = username
//     this._password = password
//   }

//   get username(): string {
//     return this._username
//   }

//   set username(value: string) {
//     this._username = value
//   }

//   get password(): string {
//     return this._password
//   }

//   set password(value: string) {
//     this._password = value
//   }
// }
import { NoteAttributes, NoteInput, NoteOutput } from './NoteAttributes'
import sequelizeConnection from '~/db_connection'
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
    sequelize: sequelizeConnection,
    timestamps: true,
    modelName: 'note'
  }
)

Note.belongsToMany(Tag, { through: 'note-tag', foreignKey: 'note_id' })
Tag.belongsToMany(Note, { through: 'note-tag', foreignKey: 'tag_id' })
