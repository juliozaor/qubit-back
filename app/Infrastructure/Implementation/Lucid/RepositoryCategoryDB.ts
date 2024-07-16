import { Pager } from "App/Domain/Pager";
import { PaginationMapperDB } from "./PaginationMapperDB";
import { Category } from "App/Domain/Data/Entities/Category";
import TblCategory from "App/Infrastructure/Datas/Entity/Categories";
import { RepositoryCategory } from "App/Domain/Repositories/RepositoryCategory";
export class RepositoryCategoryDB implements RepositoryCategory {
  async getCategories(params: any): Promise<{ categories: Category[]; pagination: Pager }> {
    const categories: Category[] = [];
    const { term, page, limit } = params;

    const sql = TblCategory.query();
    if (term) {
      sql.andWhere((subquery) => {
        subquery.whereRaw("LOWER(code) LIKE LOWER(?)", [`%${term}%`]);
        subquery.orWhereRaw("LOWER(id) LIKE LOWER(?)", [`%${term}%`]);
        subquery.orWhereRaw("LOWER(name) LIKE LOWER(?)", [`%${term}%`]);
      });
    }

    const categoryDB = await sql.orderBy("id", "asc").paginate(page, limit);

    categoryDB.forEach((categoryDB) => {
      categories.push(categoryDB.getCategory());
    });
    const pagination = PaginationMapperDB.getPager(categoryDB);
    return { categories, pagination };
  }

  async getCategory(id: number): Promise<Category> {
    try {
      const category = await TblCategory.findOrFail(id);
      return category.getCategory();      
    } catch (error) {
      throw new Error("Category no found");
      
    }
  }



  async setCategory(category: Category): Promise<Category> {
    let categoryDB = new TblCategory();
    categoryDB.setCategory(category);
    await categoryDB.save();
    return categoryDB;
  }

  async updateCategoryAll(category:Category): Promise<Category> {
    try {
      let categoryDB = await TblCategory.findOrFail(category.id);
      categoryDB.updateCategory(category);
      await categoryDB.save();
      return categoryDB;
      
    } catch (error) {
      throw new Error("Category no found - "+ error);
    }
  }

  async deleteCategory(id:number): Promise<{message: string}> {
    try {
      let categoryDB = await TblCategory.findOrFail(id);
      await categoryDB.delete();
      return {message:'Category successfully removed'};
      
    } catch (error) {
      throw new Error("Category no found");
    }
  }


}
