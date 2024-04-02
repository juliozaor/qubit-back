
import { Pager } from '../../Pager';
import { RepositoryItems } from 'App/Domain/Repositories/RepositoryItems';
import { Item } from '../Entities/Item';

export class ServiceItem{
  constructor (private repository: RepositoryItems) { }

  async getItems(param: any): Promise<{items: Item[], pagination: Pager}>{
    return this.repository.getItems(param)
  }
  async getItem(id:number): Promise<Item>{
    return this.repository.getItem(id)
  }
  async setItem(item: Item): Promise<Item>{
    return this.repository.setItem(item)
  }
  async updateItemAll(item:Item): Promise<Item>{
    return this.repository.updateItemAll(item)
  }
  async deleteItem(id:number): Promise<{message: string}>{
    return this.repository.deleteItem(id)
  }


}
