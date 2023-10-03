import { IWrite } from '../interfaces/IWrite'
import { IRead } from '../interfaces/IRead'

export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
  create(item: T): Promise<any> {
    throw new Error('Method not implemented.')
  }
  update(id: string, item: T): Promise<any> {
    throw new Error('Method not implemented.')
  }
  delete(id: string): Promise<any> {
    throw new Error('Method not implemented.')
  }
  find(item: T): Promise<any> {
    throw new Error('Method not implemented.')
  }
  findOne(id: string): Promise<any> {
    throw new Error('Method not implemented.')
  }
}
