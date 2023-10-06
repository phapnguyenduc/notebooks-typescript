export interface IWrite<T> {
  create(item: T): Promise<T>
  update(id: number, item: T): Promise<boolean>
  delete(id: number, item: T): Promise<boolean>
}
