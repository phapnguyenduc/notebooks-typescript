export interface IRead<T> {
  find(item: T): Promise<T[]>
  findOne(username: string): Promise<T | null>
}
