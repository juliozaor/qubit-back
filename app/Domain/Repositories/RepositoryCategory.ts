
import { Category } from '../Data/Entities/Category';
import { Pager } from '../Pager';

export interface RepositoryCategory {
  getCategories(param: any): Promise<{categories: Category[], pagination: Pager}>
  getCategory(id:number): Promise<Category>
  setCategory(category: Category): Promise<Category>
  updateCategoryAll(category:Category): Promise<Category>
  deleteCategory(id:number): Promise<{message: string}>
}
