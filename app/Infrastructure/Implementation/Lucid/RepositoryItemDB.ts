import { Pager } from "App/Domain/Pager";
import { PaginationMapperDB } from "./PaginationMapperDB";
import { RepositoryItems } from "App/Domain/Repositories/RepositoryItems";
import { Item } from "App/Domain/Data/Entities/Item";
import TblItem from "App/Infrastructure/Datas/Entity/Items";
export class RepositoryItemDB implements RepositoryItems {
  async getItems(params: any): Promise<{ items: Item[]; pagination: Pager }> {
    const items: Item[] = [];
    const { term, page, limit } = params;

    const sql = TblItem.query();
    if (term) {
      sql.andWhere((subquery) => {
        subquery.whereRaw("LOWER(description) LIKE LOWER(?)", [`%${term}%`]);
        subquery.orWhereRaw("LOWER(id) LIKE LOWER(?)", [`%${term}%`]);
        subquery.orWhereRaw("LOWER(name) LIKE LOWER(?)", [`%${term}%`]);
        subquery.orWhereRaw("LOWER(code) LIKE LOWER(?)", [`%${term}%`]);
      });
    }

    const itemsDB = await sql.orderBy("name", "asc").paginate(page, limit);

    itemsDB.forEach((itemsDB) => {
      items.push(itemsDB.getItem());
    });
    const pagination = PaginationMapperDB.getPager(itemsDB);
    return { items, pagination };
  }

  async getItem(id: number): Promise<Item> {
    try {
      const item = await TblItem.findOrFail(id);
      return item.getItem();      
    } catch (error) {
      throw new Error("Item no found");
      
    }
  }


  async setItem(item: Item): Promise<Item> {
    let itemDB = new TblItem();
    itemDB.setItem(item);
    await itemDB.save();
    return itemDB;
  }

  async updateItemAll(item:Item): Promise<Item> {
    try {
      let itemDB = await TblItem.findOrFail(item.id);
      itemDB.updateItem(item);
      await itemDB.save();
      return itemDB;
      
    } catch (error) {
      throw new Error("Item no found");
    }
  }

  async deleteItem(id:number): Promise<{message: string}> {
    try {
      let itemDB = await TblItem.findOrFail(id);
      await itemDB.delete();
      return {message:'Item successfully removed'};
      
    } catch (error) {
      throw new Error("Item no found");
    }
  }


}
