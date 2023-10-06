import { IWrite } from '../interfaces/IWrite'
import { IRead } from '../interfaces/IRead'

export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
  create(item: T): Promise<T> {
    throw new Error('Method not implemented.')
  }
  update(id: number, item: T): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
  delete(id: number, item: T): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
  find(item: T): Promise<T[]> {
    throw new Error('Method not implemented.')
  }
  findOne(username: string): Promise<T | null> {
    throw new Error('Method not implemented.')
  }
}
