
import { Pager } from '../../Pager';
import { Category } from '../Entities/Category';
import { RepositoryCategory } from 'App/Domain/Repositories/RepositoryCategory';

export class ServiceCategory{
  constructor (private repository: RepositoryCategory) { }

  async getCategories(param: any): Promise<{categories: Category[], pagination: Pager}>{
    return this.repository.getCategories(param)
  }
  async getCategory(id:number): Promise<Category>{
    return this.repository.getCategory(id)
  }

  async setCategory(category: Category): Promise<Category>{
    return this.repository.setCategory(category)
  }
  async updateCategoryAll(category:Category): Promise<Category>{
    return this.repository.updateCategoryAll(category)
  }
  async deleteCategory(id:number): Promise<{message: string}>{
    return this.repository.deleteCategory(id)
  }

}
