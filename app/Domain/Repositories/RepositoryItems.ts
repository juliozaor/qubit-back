
import { Item } from '../Data/Entities/Item';
import { Pager } from '../Pager';

export interface RepositoryItems {
  getItems(param: any): Promise<{items: Item[], pagination: Pager}>
  getItem(id:number): Promise<Item>
  setItem(item: Item): Promise<Item>
  updateItemAll(item:Item): Promise<Item>
  deleteItem(id:number): Promise<{message: string}>
}
